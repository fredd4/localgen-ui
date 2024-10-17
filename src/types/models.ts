import { companies, models } from "@/config/supportedModels";

export type Model = (typeof models)[number];
export type Company = (typeof companies)[number];

export type ModelSettings = {
  [key in Model]: {
    maxPromptLength: number;
    displayName: string;
    company: Company;
    sizes?: {
      square: string;
      horizontal: string;
      vertical: string;
    };
  };
};
