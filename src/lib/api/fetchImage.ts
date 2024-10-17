import { GenerationOptions } from "@/types";
import { estimateCost } from "../costEstimation";

function wait(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const fetchImage = async (options: GenerationOptions, apiKey: string) => {
  console.log("API Key is set: ", (apiKey !== ""));
  const url =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAIAQMAAAD+wSzIAAAABlBMVEX///+/v7+jQ3Y5AAAADklEQVQI12P4AIX8EAgALgAD/aNpbtEAAAAASUVORK5CYII";
  const cost = estimateCost({ ...options, numImages: 1 });
  const revisedPrompt = "revised: " + options.prompt;
  await wait(5000);
  return { url, revisedPrompt, cost };
};
