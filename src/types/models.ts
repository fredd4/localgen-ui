import { companies, models } from "@/config/supportedModels";

export type Model = (typeof models)[number];
export type Company = (typeof companies)[number];
export type AspectRatioParameter = "1024x1024" | "1792x1024" | "1024x1792";

export type ModelSettings = {
  [key in Model]: {
    maxPromptLength: number;
    displayName: string;
    company: Company;
  };
};
