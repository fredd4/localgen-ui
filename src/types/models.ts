export type Company = "OpenAI";
export type Model = "dall-e-3" | "dall-e-2";

export type AspectRatioValue = "square" | "horizontal" | "vertical";
export type AspectRatioParameter = "1024x1024" | "1792x1024" | "1024x1792";

export interface ModelCapabilities {
  maxPromptLength: number;
  supportedAspectRatios: AspectRatioValue[];
  aspectRatioToSize: {
    [key in AspectRatioValue]?: AspectRatioParameter;
  };
}

export interface ModelConfig {
  displayName: string;
  company: Company;
  capabilities: ModelCapabilities;
}
