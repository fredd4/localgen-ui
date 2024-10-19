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
    case "OpenAI":
      // eslint-disable-next-line no-case-declarations
      const openai = new OpenAI({ apiKey, dangerouslyAllowBrowser: true });

      // eslint-disable-next-line no-case-declarations
      const result = await openai.images.generate({
        model: model,
        prompt: options.prompt,
        quality: options.hdQuality ? "hd" : "standard",
        size: size,
        n: 1,
        response_format: "b64_json",
      });

      if (!result.data[0].b64_json || !result.data[0].revised_prompt) {
        throw new Error("Image generation failed");
      }

      return {
        url: "data:image/png;base64," + result.data[0].b64_json,
        revisedPrompt: result.data[0].revised_prompt,
        cost,
      };

    default:
      throw new Error(`Unsupported company: ${company}`);
  }
};
