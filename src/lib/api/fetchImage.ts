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

      // eslint-disable-next-line no-case-declarations
      const result = await openai.images.generate({
        model: model,
        prompt: (options.useExactPrompt && exactPromptInstruction) + options.prompt,
        quality: options.quality,
        size: size,
        moderation: options.moderation,
        n: 1,
      });

      
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
    default:
      throw new Error(`Unsupported company: ${company}`);
  }
};
