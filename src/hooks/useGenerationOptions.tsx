import { estimateCost } from "@/lib/costEstimation";
import {
  generationOptionsAtom,
  priceAtom,
  showGenerationOptionsAtom,
} from "@/store/atoms";
import { useAtom } from "jotai";
import { useEffect } from "react";

export const useGenerationOptions = () => {
  const [price, setPrice] = useAtom(priceAtom);
  const [showSettings, setShowSettings] = useAtom(showGenerationOptionsAtom);
  const toggleShowSettings = () => setShowSettings((prev) => !prev);
  const [generationOptions, setGenerationOptions] = useAtom(
    generationOptionsAtom
  );

  useEffect(() => {
    const price = estimateCost(generationOptions);
    setPrice(price);
  }, [generationOptions, setPrice]);

  return {
    price,
    setPrice,
    showSettings,
    toggleShowSettings,
    generationOptions,
    setGenerationOptions,
  };
};
