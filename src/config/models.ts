import { ModelConfig } from "@/types/models";

export const modelConfigs: Record<string, ModelConfig> = {
  "gpt-image-1": {
    displayName: "GPT Image 1",
    company: "OpenAI",
    capabilities: {
      maxPromptLength: 4000,
      supportedAspectRatios: ["square", "horizontal", "vertical"],
      aspectRatioToSize: {
        square: "1024x1024",
        horizontal: "1536x1024",
        vertical: "1024x1536",
      },
    },
  },
} as const;
