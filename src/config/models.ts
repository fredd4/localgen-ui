import { ModelSettings } from "@/types/models";

export const modelSettings: ModelSettings = {
    "dall-e-3": {
        max_prompt_length: 4000,
        sizes: {
            square: "1024x1024",
            horizontal: "1792x1024",
            vertical: "1024x1792",
        }
    },
    "dall-e-2": {
        max_prompt_length: 1000,
    },
} as const;