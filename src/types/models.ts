import { models } from "@/config/supportedModels";

export type Model = typeof models[number];

export type ModelSettings = {
    [key in Model]: {
        max_prompt_length: number;
        sizes?: {
            square: string;
            horizontal: string;
            vertical: string;
        };
    };
};