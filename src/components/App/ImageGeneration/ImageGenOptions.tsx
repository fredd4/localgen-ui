import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { InteractiveRangeSlider } from "@/components/ui/slider";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { MAX_IMAGES, MIN_IMAGES } from "@/config/imageGeneration";
import { estimateCost } from "@/lib/costEstimation";
import { cn } from "@/lib/utils";
import { generationOptionsAtom, priceAtom } from "@/store/atoms";
import { StyleValue } from "@/types";
import * as TogglePrimitive from "@radix-ui/react-toggle";
import { useAtom, useSetAtom } from "jotai";
import { ChevronDownIcon, ChevronUpIcon, GemIcon } from "lucide-react";
import { useEffect } from "react";
import { AspectRatioToggle } from "./AspectRatioToggle";

interface ImageGenOptionsToggleProps {
  showSettings: boolean;
  toggleShowSettings: () => void;
}

export const ImageGenOptionsToggle = ({
  showSettings,
  toggleShowSettings,
}: Readonly<ImageGenOptionsToggleProps>) => {
  return (
    <div className="flex flex-row items-center">
      <Button
        variant="ghost"
        size="sm"
        className="flex items-center"
        onClick={toggleShowSettings}
      >
        <p className="mr-1 pb-0.5 text-sm font-semibold">Generation Options</p>
        {showSettings ? (
          <ChevronUpIcon className="h-4 w-4" />
        ) : (
          <ChevronDownIcon className="h-4 w-4" />
        )}
        <span className="sr-only">Toggle settings for image generation</span>
      </Button>
    </div>
  );
};

export const ImageGenOptions = () => {
  const [generationOptions, setGenerationOptions] = useAtom(generationOptionsAtom);
  const setPrice = useSetAtom(priceAtom);

  useEffect(() => {
    const price = estimateCost(generationOptions);
    setPrice(price);
  }, [generationOptions, setPrice]);

  const onStyleChange = (value: string) => {
    if (value === "natural" || value === "vivid") {
      setGenerationOptions({
        ...generationOptions,
        style: value as StyleValue,
      });
    }
  };

  const onHdQualityToggle = () => {
    setGenerationOptions({
      ...generationOptions,
      hdQuality: !generationOptions.hdQuality,
    });
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
          setAspectRatio={(newAspectRatio) =>
            setGenerationOptions({
              ...generationOptions,
              aspectRatio: newAspectRatio,
            })
          }
        />
      </div>
      <div className="flex flex-row items-center justify-between">
        <div className="space-y-2">
          <ToggleGroup
            type="single"
            value={generationOptions.style}
            onValueChange={onStyleChange}
            className="justify-start"
          >
            <ToggleGroupItem value="natural" aria-label="Natural">
              Natural
            </ToggleGroupItem>
            <ToggleGroupItem value="vivid" aria-label="Vivid">
              Vivid
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
        <div className="flex items-center space-x-2">
          <TogglePrimitive.Root
            aria-label="Toggle HD Quality"
            className={cn(
              "inline-flex h-9 items-center justify-center rounded-md bg-transparent px-3 text-sm font-medium transition-colors hover:bg-muted hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground",
              generationOptions.hdQuality ? "text-primary" : "text-zinc-200"
            )}
            pressed={generationOptions.hdQuality}
            onPressedChange={onHdQualityToggle}
          >
            <GemIcon className={"mr-2 h-4 w-4"} />
            HD Quality
          </TogglePrimitive.Root>
        </div>
      </div>
      <div>
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
