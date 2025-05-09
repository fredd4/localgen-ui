import { debugImagePngBase64 } from "@/assets/debugImagePng";
import { modelConfigs } from "@/config/models";
import { GenerationOptions, Model } from "@/types";
import OpenAI from "openai";
import { estimateCost } from "../costEstimation";

export const fetchImage = async (
  options: GenerationOptions,
  apiKey: string
) => {
  const cost = estimateCost({ ...options, numImages: 1 });
  if (apiKey === "") throw new Error("You must provide a valid API key");
  if (apiKey === "sk-debug") return { url: debugImagePngBase64, cost, revisedPrompt: "" }
  
  const model = options.model as Model;
  const modelConfig = modelConfigs[model];

  if (!modelConfig) {
    console.error(`Unsupported model: ${options.model}`);
    throw new Error(`Unsupported model: ${options.model}`);
  }

  const { company, capabilities } = modelConfig;

  if (!capabilities.supportedAspectRatios.includes(options.aspectRatio)) {
    console.error(`Aspect ratio ${options.aspectRatio} is not supported by model ${options.model}`);
    throw new Error(
      `Aspect ratio ${options.aspectRatio} is not supported by model ${options.model}`
    );
  }

  const size = capabilities.aspectRatioToSize[options.aspectRatio];
  if (!size) {
    console.error(`Size for aspect ratio ${options.aspectRatio} is not defined for model ${options.model}`);
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
        // Determine if we're in agent mode and already have an enhanced prompt
        // or if we need to process the image as a vision task
        if (options.agentMode) {
          // In agent mode with enhanced prompt, use the input image as a reference
          // but don't process it through vision API again
          try {
            // We'll use the image input as a reference but with the enhanced prompt
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
                    content: "You are an AI image generation system. Generate an image based on the user's instructions, using the provided reference image for style, composition, or content inspiration." 
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
              console.error("Vision API error:", errorData);
              throw new Error(`Vision API error: ${errorData.error?.message || response.statusText}`);
            }

            // Get the refined prompt from GPT-4o
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
              console.error("Image generation failed: Empty response data");
              throw new Error("Image generation failed");
            }
            
            const imageData = imageResult.data[0];
            const base64Data = imageData.b64_json;
            
            if (!base64Data) {
              console.error("Image generation failed: No base64 data in response");
              throw new Error("No image data in the response");
            }

            return {
              url: "data:image/png;base64," + base64Data,
              revisedPrompt: enhancedPrompt,
              cost,
            };
          } catch (error) {
            console.error("Error in vision-based generation:", error);
            
            // Handle OpenAI API-specific errors
            if (error instanceof OpenAI.APIError) {
              console.error("Status:", error.status);
              console.error("Name:", error.name);
              
              if (error.error) {
                console.error("Error details:", error.error);
                console.error("Error type:", error.error.type);
                console.error("Error message:", error.error.message);
              }
            }
            
            throw new Error(`Failed to process the image input: ${(error as Error).message}`);
          }
        } else {
          // Standard vision-based generation (not agent mode)
          try {
            // Use the vision API for direct image modification
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
              console.error("Vision API error:", errorData);
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
              console.error("Image generation failed: Empty response data");
              throw new Error("Image generation failed");
            }
            
            const imageData = imageResult.data[0];
            const base64Data = imageData.b64_json;
            
            if (!base64Data) {
              console.error("Image generation failed: No base64 data in response");
              throw new Error("No image data in the response");
            }

            return {
              url: "data:image/png;base64," + base64Data,
              revisedPrompt: enhancedPrompt,
              cost,
            };
          } catch (error) {
            console.error("Error in vision-based generation:", error);
            
            // Handle OpenAI API-specific errors
            if (error instanceof OpenAI.APIError) {
              console.error("Status:", error.status);
              console.error("Name:", error.name);
              
              if (error.error) {
                console.error("Error details:", error.error);
                console.error("Error type:", error.error.type);
                console.error("Error message:", error.error.message);
              }
            }
            
            throw new Error(`Failed to process the image input: ${(error as Error).message}`);
          }
        }
      } else {
        // Standard text-to-image generation flow (no image input)
        try {
          const requestParams: OpenAI.Images.ImageGenerateParams = {
            model: model,
            quality: options.quality as "standard" | "hd",
            size: size,
            moderation: options.moderation === "low" ? "low" : "auto",
            n: 1,
            prompt: options.prompt,
          };

          const result = await openai.images.generate(requestParams);
          
          if (!result.data || !result.data[0]) {
            console.error("Image generation failed: Empty response data");
            throw new Error("Image generation failed");
          }
          
          // Handle possible response formats from GPT-image-1
          const imageData = result.data[0];
          const base64Data = imageData.b64_json;
          
          if (!base64Data) {
            console.error("Image generation failed: No base64 data in response");
            throw new Error("No image data in the response");
          }

          return {
            url: "data:image/png;base64," + base64Data,
            revisedPrompt: "",
            cost,
          };
        } catch (error) {
          console.error("Error in standard image generation:", error);
          
          // Handle OpenAI API-specific errors
          if (error instanceof OpenAI.APIError) {
            console.error("Status:", error.status);
            console.error("Name:", error.name);
            
            if (error.error) {
              console.error("Error details:", error.error);
              console.error("Error type:", error.error.type);
              console.error("Error message:", error.error.message);
            }
          }
          
          throw error;
        }
      }
    }
    default:
      console.error(`Unsupported company: ${company}`);
      throw new Error(`Unsupported company: ${company}`);
  }
};
