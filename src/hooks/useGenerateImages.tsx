import { placeHolderSvgBase64 } from "@/assets/placeholderSvg";
import {
  errorAtom,
  generatedImagesAtom,
  isGeneratingAtom,
} from "@/store/atoms";
import { GeneratedImage } from "@/types";
import { useAtom } from "jotai";
/* import OpenAI from "openai"; */

export const useGenerateImages = () => {
  const [isGenerating, setIsGenerating] = useAtom(isGeneratingAtom);
  const [generatedImages, setGeneratedImages] = useAtom(generatedImagesAtom);
  const [error, setError] = useAtom(errorAtom);

  const generateImages = () => {
    /* const openai = new OpenAI({
      apiKey: "sk-1234",
    });
    openai.images.generate({ model: "dall-e-3", prompt: "A cute baby sea otter" }); */
    const placeHolderImage: GeneratedImage = {
      id: "test",
      generationId: "test",
      state: "pending",
      locallySaved: false,
      usedOptions: {
        prompt: "test",
        useExactPrompt: false,
        aspectRatio: "square",
        style: "natural",
        hdQuality: false,
        numImages: 1,
      },
      image: placeHolderSvgBase64,
      revisedPrompt: "test",
      cost: 0,
    } as const;

    setIsGenerating(true);
    setTimeout(() => {
      setGeneratedImages([
        placeHolderImage,
        placeHolderImage,
        placeHolderImage,
        placeHolderImage,
      ]);
      setError("Something went wrong!");
      setIsGenerating(false);
    }, 2000);
  };

  return { generateImages, isGenerating, generatedImages, error };
};
