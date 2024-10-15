import {
  generationOptionsAtom,
  priceAtom,
  showGenerationOptionsAtom,
} from "@/store/atoms";
import { useAtom } from "jotai";

export const useGenerationOptions = () => {
  const [price, setPrice] = useAtom(priceAtom);
  const [showSettings, setShowSettings] = useAtom(showGenerationOptionsAtom);
  const toggleShowSettings = () => setShowSettings((prev) => !prev);

  const [generationOptions, setGenerationOptions] = useAtom(
    generationOptionsAtom
  );

  return {
    price,
    setPrice,
    showSettings,
    toggleShowSettings,
    generationOptions,
    setGenerationOptions,
  };
};
