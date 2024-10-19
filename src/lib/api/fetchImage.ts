import { dalle3RatioToSize } from "@/config/models";
import { GenerationOptions } from "@/types";
import OpenAI from "openai";
import { estimateCost } from "../costEstimation";

export const fetchImage = async (
  options: GenerationOptions,
  apiKey: string
) => {
  const cost = estimateCost({ ...options, numImages: 1 });
  if (apiKey === "") throw(new Error("You must provide a valid API key"))
  if (options.model === "dall-e-3") {
    const openai = new OpenAI({apiKey, dangerouslyAllowBrowser: true});
    const result = await openai.images.generate({
      model: "dall-e-3",
      prompt: options.prompt,
      quality: options.hdQuality ? "hd" : "standard",
      size: dalle3RatioToSize(options.aspectRatio),
      n: 1,
      response_format: "b64_json"
    });
    if (!result.data[0].b64_json || !result.data[0].revised_prompt) throw (new Error("Image generation failed"))
    return { url: "data:image/png;base64," + result.data[0].b64_json, revisedPrompt: result.data[0].revised_prompt, cost };
  }
  
  throw(new Error("Unsupported model"))
};
