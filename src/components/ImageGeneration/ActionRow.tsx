import ImageSettingsIcon from "@/assets/ImageSettingsIcon";
import { Button } from "@/components/ui/button";
import { smallDeviceMediaQuery } from "@/config/app";
import { MAX_IMAGES, MIN_IMAGES } from "@/config/imageGeneration";
import { useManageImageGeneration } from "@/hooks/useManageImageGeneration";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import {
  generationOptionsAtom,
  isGeneratingAtom,
  priceAtom,
  promptEnhancingAtom,
  showGenerationOptionsAtom,
} from "@/store/atoms";
import { useAtom, useAtomValue } from "jotai";
import { ChevronDown, ChevronUp, Loader2 } from "lucide-react";
import { useState } from "react";

const ActionRow = () => {
  const price = useAtomValue(priceAtom);
  const [showGenerationOption, setShowGenerationOption] = useAtom(
    showGenerationOptionsAtom
  );
  const [isProcessing, setIsProcessing] = useState(false);
  const [isEnhancing] = useAtom(promptEnhancingAtom);
  const [isGenerating] = useAtom(isGeneratingAtom);
  const toggleGenerationOption = () =>
    setShowGenerationOption(!showGenerationOption);
  const generationOptions = useAtomValue(generationOptionsAtom);
  const { addNewImageGeneration } = useManageImageGeneration();
  
  // Determine if the button should be disabled or show loading state
  const isLoading = isEnhancing || isGenerating || isProcessing;
  
  const handleGenerate = async () => {
    // Prevent duplicate requests
    if (isLoading) return;
    
    setIsProcessing(true);
    try {
      // Add new image generation
      await addNewImageGeneration(generationOptions);
      
      // Scroll to the images section after a short delay to allow for rendering
      setTimeout(() => {
        const imagesSection = document.getElementById('generated-images-section');
        if (imagesSection) {
          imagesSection.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start'
          });
        }
      }, 100);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex h-10 w-full items-stretch space-x-1 rounded-lg sm:h-16 sm:space-x-2 sm:p-2 sm:shadow-md">
      <QuantitySelector />

      <Button
        disabled={isLoading}
        className="flex h-full flex-grow items-center bg-primary text-primary-foreground hover:bg-primary/90 sm:justify-between"
        onClick={handleGenerate}
      >
        <p className="hidden font-mono text-sm text-primary opacity-80 sm:block">
          ${price.toFixed(2)}
        </p>
        <div className="flex items-center space-x-2">
          {isLoading && <Loader2 className="mr-1 h-4 w-4 animate-spin" />}
          <p className="text-lg font-bold">Generate</p>
          {isEnhancing && <p className="text-xs font-normal italic">Enhancing prompt...</p>}
        </div>
        <p className="hidden font-mono text-sm opacity-80 sm:block">
          ${price.toFixed(2)}
        </p>
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

const QuantitySelector = () => {
  const isSmallDevice = useMediaQuery(smallDeviceMediaQuery);
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

export default ActionRow;
