import { Button } from "@/components/ui/button";
import { MAX_IMAGES, MIN_IMAGES } from "@/config/imageGeneration";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import {
  gaUseExactPromptAtom,
  generationOptionsAtom,
  priceAtom,
  showGenerationOptionsAtom,
} from "@/store/atoms";
import { useAtom, useAtomValue } from "jotai";
import { ChevronDown, ChevronUp } from "lucide-react";
import ImageSettingsIcon from "./ImageSettingsIcon";

const QuantitySelector = () => {
  const isSmallDevice = useMediaQuery("only screen and (max-width : 530px)");
  const [generationOptions, setGenerationOptions] = useAtom(
    generationOptionsAtom
  );
  const increment = () =>
    setGenerationOptions({
      ...generationOptions,
      numImages: Math.min(generationOptions.numImages + 1, MAX_IMAGES),
    });
  const decrement = () =>
    setGenerationOptions({
      ...generationOptions,
      numImages: Math.max(generationOptions.numImages - 1, MIN_IMAGES),
    });

  return (
    <div
      className={`flex items-stretch overflow-hidden rounded-lg border border-input ${isSmallDevice && "hidden"}`}
    >
      <div className="flex min-w-[64px] flex-col items-center justify-center">
        <div className="text-xs text-muted-foreground">Quantity</div>
        <div className="-mt-1 text-xl font-bold">
          {generationOptions.numImages}
        </div>
      </div>
      <div className="flex flex-col border-l border-input">
        <button
          onClick={increment}
          className="flex flex-1 items-center justify-center transition-colors hover:bg-accent"
          aria-label="Increase quantity"
        >
          <ChevronUp size={18} />
        </button>
        <button
          onClick={decrement}
          className="flex flex-1 items-center justify-center border-t border-input transition-colors hover:bg-accent"
          aria-label="Decrease quantity"
        >
          <ChevronDown size={18} />
        </button>
      </div>
    </div>
  );
};

const ActionRow = () => {
  const [useExactPrompt, setUseExactPrompt] = useAtom(gaUseExactPromptAtom);
  const price = useAtomValue(priceAtom);
  const [showGenerationOption, setShowGenerationOption] = useAtom(
    showGenerationOptionsAtom
  );
  const toggleGenerationOption = () =>
    setShowGenerationOption(!showGenerationOption);

  return (
    <div className="flex h-10 sm:h-16 w-full items-stretch rounded-lg space-x-1 sm:p-2 sm:space-x-2 sm:shadow-md">
      <QuantitySelector />

      <Button className="flex h-full flex-grow items-center sm:justify-between bg-primary text-primary-foreground hover:bg-primary/90">
        <p className="hidden sm:block text-primary font-mono text-sm opacity-80">
          ${price.toFixed(2)}
        </p>
        <p className="text-lg font-bold">Generate</p>
        <p className="hidden sm:block font-mono text-sm opacity-80">${price.toFixed(2)}</p>
      </Button>

      <Button
        variant={useExactPrompt ? "default" : "outline"}
        onClick={() => setUseExactPrompt(!useExactPrompt)}
        className={`flex h-full w-24 flex-col items-center justify-center p-1 px-2 ${
          useExactPrompt
            ? "bg-primary text-primary-foreground"
            : "bg-background text-foreground"
        }`}
        style={{ flexShrink: 0 }}
      >
        <span
          className={`sm:text-base ${useExactPrompt ? "font-bold" : "font-semibold"}`}
        >
          {useExactPrompt ? "ON" : "OFF"}
        </span>
        <span className="sm:mt-1 text-xs">Exact Prompt</span>
      </Button>

      <Button
        variant="outline"
        className="relative aspect-square h-full flex-shrink-0 p-0"
        onClick={toggleGenerationOption}
      >
        <ImageSettingsIcon />
      </Button>
    </div>
  );
};

export default ActionRow;
