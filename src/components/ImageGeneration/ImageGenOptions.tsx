import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { InteractiveRangeSlider } from "@/components/ui/slider";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { smallDeviceMediaQuery } from "@/config/app";
import { MAX_IMAGES, MIN_IMAGES } from "@/config/imageGeneration";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { generationOptionsAtom } from "@/store/atoms";
import { AspectRatioValue, PromptEnhancementModelValue, QualityValue } from "@/types";
import { useAtom } from "jotai";
import { BotIcon, LayersIcon, SparklesIcon, ZapIcon } from "lucide-react";
import { AspectRatioToggle } from "./AspectRatioToggle";

export const ImageGenOptions = () => {
  const isSmallDevice = useMediaQuery(smallDeviceMediaQuery);
  const [generationOptions, setGenerationOptions] = useAtom(
    generationOptionsAtom
  );

  const onQualityChange = (value: string) => {
    if (value === "low" || value === "medium" || value === "high") {
      setGenerationOptions({
        ...generationOptions,
        quality: value as QualityValue,
      });
    }
  };

  const onTransparencyChange = (checked: boolean) => {
    setGenerationOptions({
      ...generationOptions,
      transparency: checked,
    });
  };

  const onAgentModeChange = (checked: boolean) => {
    setGenerationOptions({
      ...generationOptions,
      agentMode: checked,
    });
  };

  const onPromptEnhancementModelChange = (value: string) => {
    if (value === "gpt-4o" || value === "gpt-4o-mini") {
      setGenerationOptions({
        ...generationOptions,
        promptEnhancementModel: value as PromptEnhancementModelValue,
      });
    }
  };

  const onNumImagesChange = (value: number) => {
    setGenerationOptions({
      ...generationOptions,
      numImages: value,
    });
  };

  return (
    <>
      <div className="space-y-2">
        <AspectRatioToggle
          aspectRatio={generationOptions.aspectRatio}
          setAspectRatio={(newAspectRatio: AspectRatioValue) =>
            setGenerationOptions({
              ...generationOptions,
              aspectRatio: newAspectRatio,
            })
          }
          disabled={generationOptions.agentMode}
        />
        {generationOptions.agentMode && (
          <div className="text-xs text-muted-foreground">
            Aspect ratio will be selected by the AI based on your prompt
          </div>
        )}
      </div>
      <div className="mt-4 space-y-2">
        <div className="flex items-center">
          <SparklesIcon className="mr-2 h-4 w-4 text-primary" />
          <span className="text-sm font-medium">Quality</span>
        </div>
        <Select value={generationOptions.quality} onValueChange={onQualityChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select Quality" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="low">Low ($0.011-$0.016)</SelectItem>
            <SelectItem value="medium">Medium ($0.042-$0.063)</SelectItem>
            <SelectItem value="high">High ($0.167-$0.25)</SelectItem>
          </SelectContent>
        </Select>
        <div className="text-xs text-muted-foreground">
          {generationOptions.quality === "low" && "Fast drafts with basic details"}
          {generationOptions.quality === "medium" && "Balanced quality and cost"}
          {generationOptions.quality === "high" && "Premium quality with fine details"}
        </div>
      </div>
      <div className="mt-4 space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <LayersIcon className="mr-2 h-4 w-4 text-primary" />
            <span className="text-sm font-medium">Transparency</span>
          </div>
          <ToggleGroup
            type="single"
            value={generationOptions.transparency ? "on" : "off"}
            onValueChange={(value: string) => onTransparencyChange(value === "on")}
            className="justify-start"
            disabled={generationOptions.agentMode}
          >
            <ToggleGroupItem value="off" aria-label="Off">
              Off
            </ToggleGroupItem>
            <ToggleGroupItem value="on" aria-label="On">
              On
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
        <div className="text-xs text-muted-foreground">
          {generationOptions.agentMode 
            ? "Transparency will be decided by the AI based on your prompt"
            : generationOptions.transparency 
              ? "Generate images with transparent background (experimental)"
              : "Generate images with standard background"}
          {!generationOptions.agentMode && generationOptions.transparency && (
            <div className="mt-1 text-xs text-amber-500">
              Note: Transparency is a feature that may work with specific prompting techniques
            </div>
          )}
        </div>
      </div>
      <div className="mt-4 space-y-2">
        <div className="flex items-center">
          <ZapIcon className="mr-2 h-4 w-4 text-primary" />
          <span className="text-sm font-medium">Prompt Enhancement Model</span>
        </div>
        <Select 
          value={generationOptions.promptEnhancementModel} 
          onValueChange={onPromptEnhancementModelChange}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select Model" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="gpt-4o-mini">GPT-4o Mini (Faster, Less Detailed)</SelectItem>
            <SelectItem value="gpt-4o">GPT-4o (Slower, More Detailed)</SelectItem>
          </SelectContent>
        </Select>
        <div className="text-xs text-muted-foreground">
          Model used when Agent Mode is enabled to enhance your prompts
        </div>
      </div>
      <div className="mt-4 space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <BotIcon className="mr-2 h-4 w-4 text-primary" />
            <span className="text-sm font-medium">Agent Mode</span>
          </div>
          <ToggleGroup
            type="single"
            value={generationOptions.agentMode ? "on" : "off"}
            onValueChange={(value: string) => onAgentModeChange(value === "on")}
            className="justify-start"
          >
            <ToggleGroupItem value="off" aria-label="Off">
              Off
            </ToggleGroupItem>
            <ToggleGroupItem value="on" aria-label="On">
              On
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
        <div className="text-xs text-muted-foreground">
          {generationOptions.agentMode 
            ? "GPT will enhance your prompt before generating images"
            : "Use your prompt directly for image generation"}
        </div>
      </div>
      <div className="flex items-center justify-between">
        <label htmlFor="model" className="mr-2 text-sm font-medium">
          Model:
        </label>
        <Select defaultValue="gpt-image-1" disabled>
          <SelectTrigger>
            <SelectValue id="model" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>OpenAI</SelectLabel>
              <SelectItem value="gpt-image-1">GPT Image 1</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className={"" + (!isSmallDevice && " hidden")}>
        <Label htmlFor="num-images">
          Number of Images: {generationOptions.numImages}
        </Label>
        <InteractiveRangeSlider
          min={MIN_IMAGES}
          max={MAX_IMAGES}
          step={1}
          value={generationOptions.numImages}
          setValue={onNumImagesChange}
        />
      </div>
    </>
  );
};
