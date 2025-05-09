import { debugImagePngBase64 } from "@/assets/debugImagePng";
import { exactPromptInstruction, modelConfigs } from "@/config/models";
import { GenerationOptions, Model } from "@/types";
import OpenAI from "openai";
import { estimateCost } from "../costEstimation";

export const fetchImage = async (
  options: GenerationOptions,
  apiKey: string
) => {
  const cost = estimateCost({ ...options, numImages: 1 });
  if (apiKey === "") throw new Error("You must provide a valid API key");
  if (apiKey === "sk-debug") return { url: debugImagePngBase64, cost, revisedPrompt: "revised: " + options.prompt }
  const model = options.model as Model;
  const modelConfig = modelConfigs[model];

  if (!modelConfig) {
    throw new Error(`Unsupported model: ${options.model}`);
  }

  const { company, capabilities } = modelConfig;

  if (!capabilities.supportedAspectRatios.includes(options.aspectRatio)) {
    throw new Error(
      `Aspect ratio ${options.aspectRatio} is not supported by model ${options.model}`
    );
  }

  const size = capabilities.aspectRatioToSize[options.aspectRatio];
  if (!size) {
    throw new Error(
      `Size for aspect ratio ${options.aspectRatio} is not defined for model ${options.model}`
    );
  }

  switch (company) {
    case "OpenAI": {
      // eslint-disable-next-line no-case-declarations
      const openai = new OpenAI({ apiKey, dangerouslyAllowBrowser: true });

      // For image input, we need to use a different approach
      if (options.imageInput) {
        // Construct a message with both the image and prompt
        try {
          // We don't use images.generate when an image is provided
          // Instead, we need to send to OpenAI API's Vision endpoint directly
          const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
              model: "gpt-4o",
              messages: [
                { 
                  role: "system", 
                  content: "You are an AI image enhancement system. Generate an improved version of the provided image based on the user's instructions." 
                },
                {
                  role: "user",
                  content: [
                    { type: "text", text: options.prompt },
                    { 
                      type: "image_url", 
                      image_url: { 
                        url: options.imageInput
                      }
                    }
                  ]
                }
              ],
              max_tokens: 300
            })
          });

          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Vision API error: ${errorData.error?.message || response.statusText}`);
          }

          // At this point, we'd have a text response from the vision model
          // But we want an image output, so we need to take that response and feed it
          // into another image generation call
          const visionData = await response.json();
          const enhancedPrompt = visionData.choices[0].message.content;

          // Now use the enhanced prompt for image generation
          const imageResult = await openai.images.generate({
            model: model,
            prompt: enhancedPrompt,
            quality: options.quality as "standard" | "hd",
            size: size,
            moderation: options.moderation === "low" ? "low" : "auto",
            n: 1,
          });

          if (!imageResult.data || !imageResult.data[0]) {
            throw new Error("Image generation failed");
          }
          
          const imageData = imageResult.data[0];
          const base64Data = imageData.b64_json;
          
          if (!base64Data) {
            throw new Error("No image data in the response");
          }

          return {
            url: "data:image/png;base64," + base64Data,
            revisedPrompt: enhancedPrompt,
            cost,
          };
        } catch (error) {
          console.error("Error in vision-based generation:", error);
          throw new Error(`Failed to process the image input: ${(error as Error).message}`);
        }
      } else {
        // Standard text-to-image generation flow (no image input)
        const requestParams: OpenAI.Images.ImageGenerateParams = {
          model: model,
          quality: options.quality as "standard" | "hd",
          size: size,
          moderation: options.moderation === "low" ? "low" : "auto",
          n: 1,
          prompt: (options.useExactPrompt && exactPromptInstruction) + options.prompt,
        };

        const result = await openai.images.generate(requestParams);
        
        if (!result.data || !result.data[0]) {
          throw new Error("Image generation failed");
        }
        
        // Handle possible response formats from GPT-image-1
        const imageData = result.data[0];
        const base64Data = imageData.b64_json;
        const revisedPrompt = imageData.revised_prompt || '';
        
        if (!base64Data) {
          throw new Error("No image data in the response");
        }

        return {
          url: "data:image/png;base64," + base64Data,
          revisedPrompt: revisedPrompt,
          cost,
        };
      }
    }
    default:
      throw new Error(`Unsupported company: ${company}`);
  }
};
