import { ModelSettings } from "@/types/models";

export const dalle3RatioToSize = (ratio: "square" | "horizontal" | "vertical") => (({
  square: "1024x1024",
  horizontal: "1792x1024",
  vertical: "1024x1792",
} as const)[ratio])

export const modelSettings: ModelSettings = {
  "dall-e-3": {
    displayName: "DALL-E 3",
    company: "OpenAI",
    maxPromptLength: 4000,
  },
  "dall-e-2": {
    displayName: "DALL-E 2",
    company: "OpenAI",
    maxPromptLength: 1000,
  },
} as const;
