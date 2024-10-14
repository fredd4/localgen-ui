import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { InteractiveRangeSlider } from "@/components/ui/slider";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { estimateCost } from "@/lib/costEstimation";
import { cn } from "@/lib/utils";
import { AspectRatioValue, StyleValue } from "@/types";
import * as TogglePrimitive from "@radix-ui/react-toggle";
import { ChevronDownIcon, ChevronUpIcon, GemIcon } from "lucide-react";
import { useEffect } from "react";
import { AspectRatioToggle } from "./AspectRatioToggle";

interface ImageGenOptionsToggleProps {
  showSettings: boolean;
  toggleShowSettings: () => void;
}

interface ImageGenOptionsProps {
  aspectRatio: AspectRatioValue;
  setAspectRatio: (aspectRatio: AspectRatioValue) => void;
  style: StyleValue;
  setStyle: (style: StyleValue) => void;
  hdQuality: boolean;
  setHdQuality: (hdQuality: boolean) => void;
  numImages: number;
  setNumImages: (numImages: number) => void;
  setPrice: (price: number) => void;
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

export const ImageGenOptions = ({
  aspectRatio,
  setAspectRatio,
  style,
  setStyle,
  hdQuality,
  setHdQuality,
  numImages,
  setNumImages,
  setPrice,
}: Readonly<ImageGenOptionsProps>) => {
  useEffect(() => {
    const price = estimateCost({
      aspectRatio,
      style,
      hdQuality,
      numImages,
    });
    setPrice(price);
  }, [aspectRatio, style, hdQuality, numImages]);

  return (
    <>
      <div className="space-y-2">
        {/* <Label htmlFor="aspect-ratio">Aspect Ratio</Label> */}
        <AspectRatioToggle
          aspectRatio={aspectRatio}
          setAspectRatio={setAspectRatio}
        />
      </div>
      <div className="flex flex-row items-center justify-between">
        <div className="space-y-2">
          {/* <Label htmlFor="style">Style</Label> */}
          <ToggleGroup
            type="single"
            value={style}
            onValueChange={setStyle}
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
        {/* Divider: <div
          className="inline-block min-h-[1em] w-0.5 h-7 bg-neutral-100 dark:bg-white/10 mr-2"
        /> */}
        <div className="flex items-center space-x-2">
          <TogglePrimitive.Root
            aria-label="Toggle HD Quality"
            className={cn(
              "inline-flex h-9 items-center justify-center rounded-md bg-transparent px-3 text-sm font-medium transition-colors hover:bg-muted hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground",
              hdQuality ? "text-primary" : "text-zinc-200"
            )}
            pressed={hdQuality}
            onPressedChange={() => setHdQuality(!hdQuality)}
          >
            <GemIcon className={"mr-2 h-4 w-4"} />
            HD Quality
          </TogglePrimitive.Root>
        </div>
      </div>
      <div className="">
        <Label htmlFor="num-images">Number of Images: {numImages}</Label>
        <InteractiveRangeSlider
          min={1}
          max={6}
          step={1}
          value={numImages}
          setValue={setNumImages}
        />
      </div>
      <div className="h-4"></div>
    </>
  );
};
