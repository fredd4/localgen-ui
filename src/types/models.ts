export type Company = "OpenAI";
export type Model = "gpt-image-1";

export type AspectRatioValue = "square" | "horizontal" | "vertical";
export type AspectRatioParameter = "1024x1024" | "1536x1024" | "1024x1536";

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
