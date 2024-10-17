import { ModelSettings } from "@/types/models";

export const modelSettings: ModelSettings = {
  "dall-e-3": {
    displayName: "DALL-E 3",
    company: "OpenAI",
    maxPromptLength: 4000,
    sizes: {
      square: "1024x1024",
      horizontal: "1792x1024",
      vertical: "1024x1792",
    },
  },
  "dall-e-2": {
    displayName: "DALL-E 2",
    company: "OpenAI",
    maxPromptLength: 1000,
  },
} as const;
