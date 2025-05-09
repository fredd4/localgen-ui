import OpenAI from "openai";
import { AspectRatioValue, PromptEnhancementModelValue } from "@/types";
import { ChatCompletionMessageParam } from "openai/resources/chat/completions";

interface EnhancedPrompt {
  prompt: string;
  description: string;
  aspectRatio: AspectRatioValue;
  transparency: boolean;
}

export interface EnhancedPromptsResponse {
  prompts: EnhancedPrompt[];
}

export const getEnhancedPrompts = async (
  userPrompt: string,
  numImages: number,
  apiKey: string,
  model: PromptEnhancementModelValue = "gpt-4o-mini",
  imageInput?: string
): Promise<EnhancedPromptsResponse> => {
  if (apiKey === "") throw new Error("You must provide a valid API key");
  
  // For debug mode, return mock data
  if (apiKey === "sk-debug") {
    return {
      prompts: Array(numImages).fill(null).map((_, i) => ({
        prompt: `${userPrompt} - variation ${i + 1}`,
        description: `Description for ${userPrompt} - variation ${i + 1}`,
        aspectRatio: "square",
        transparency: false
      }))
    };
  }

  const openai = new OpenAI({ apiKey, dangerouslyAllowBrowser: true });

  const systemMessage = `You are an expert image prompt engineer. Create different, detailed, and creative image generation prompts based on the user's high-level request. 
  ${imageInput ? "The user has also provided a reference image that should influence your prompt creation." : ""}
  Each prompt should be distinct and include all necessary details to create a high-quality image.
  
  For each prompt, you should also determine the best aspect ratio and whether transparency would be appropriate:

  - aspectRatio: Choose from "square" (1:1), "horizontal" (3:2), or "vertical" (2:3) based on what would best suit the content
  - transparency: Decide whether the image should have a transparent background (true/false)

  Base these decisions on the content type. For example:
  - Logos typically benefit from transparency
  - Profile pictures often work best as squares
  - Landscapes are usually horizontal
  - Portraits are usually vertical
  
  ${imageInput ? "Be sure to reference elements from the provided image in your prompts when appropriate." : ""}
  
  IMPORTANT INSTRUCTIONS ABOUT NUMBER OF PROMPTS:
  - If the user explicitly requests a specific number of images/variations in their prompt, generate exactly that many prompts
  - If the user doesn't specify a number, generate ${numImages} prompt(s) based on the user's selection
  - If unsure, generate just a single high-quality prompt variation
  
  Return your response as a valid JSON object in the following format:
  {
    "prompts": [
      {
        "prompt": "Detailed prompt text that will be sent to the image generation API",
        "description": "A brief description of what this prompt variation focuses on",
        "aspectRatio": "square" | "horizontal" | "vertical",
        "transparency": true | false
      },
      ...
    ]
  }
  
  Be creative and diverse with your prompt variations while staying true to the user's request. Generate between 1-5 creative variations of the prompt depending on the user's request.`;

  try {
    let messages: ChatCompletionMessageParam[];

    // If user provided an image, prepare a message with both text and image
    if (imageInput) {
      messages = [
        { role: "system", content: systemMessage },
        { 
          role: "user", 
          content: [
            { type: "text", text: userPrompt },
            { type: "image_url", image_url: { url: imageInput } }
          ]
        }
      ];
    } else {
      messages = [
        { role: "system", content: systemMessage },
        { role: "user", content: userPrompt }
      ];
    }

    const response = await openai.chat.completions.create({
      model: model,
      messages: messages,
      response_format: { type: "json_object" }
    });

    const content = response.choices[0].message.content;
    if (!content) {
      throw new Error("No content in the response");
    }

    try {
      const parsedResponse = JSON.parse(content) as EnhancedPromptsResponse;
      
      // Validate that we have at least one prompt
      if (!parsedResponse.prompts || parsedResponse.prompts.length === 0) {
        throw new Error("No prompts received from OpenAI");
      }

      // Validate aspect ratios
      parsedResponse.prompts.forEach(prompt => {
        if (!["square", "horizontal", "vertical"].includes(prompt.aspectRatio)) {
          prompt.aspectRatio = "square"; // Default to square if invalid
        }
      });
      
      return parsedResponse;
    } catch (parseError) {
      throw new Error(`Failed to parse OpenAI response: ${(parseError as Error).message}`);
    }
  } catch (error) {
    throw new Error(`OpenAI API error: ${(error as Error).message}`);
  }
}; 