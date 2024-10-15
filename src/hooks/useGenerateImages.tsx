import {
  errorAtom,
  generatedImagesAtom,
  isGeneratingAtom,
} from "@/store/atoms";
import { useAtom } from "jotai";

export const useGenerateImages = () => {
  const [isGenerating, setIsGenerating] = useAtom(isGeneratingAtom);
  const [generatedImages, setGeneratedImages] = useAtom(generatedImagesAtom);
  const [error, setError] = useAtom(errorAtom);

  const generateImages = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setGeneratedImages([
        "/placeholder.svg?height=512&width=512",
        "/placeholder.svg?height=512&width=512",
        "/placeholder.svg?height=512&width=512",
        "/placeholder.svg?height=512&width=512",
      ]);
      setError("Something went wrong!");
      setIsGenerating(false);
    }, 2000);
  };

  return { generateImages, isGenerating, generatedImages, error };
};
