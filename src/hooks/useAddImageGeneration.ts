import { useAtom } from 'jotai';
import { generatedImagesAtom } from '@/store/atoms';
import { GenerationOptions, GeneratedImage } from '@/types';
import { v4 as uuidv4 } from 'uuid';
import { useImageGeneration } from './useImageGeneration';

export function useAddImageGeneration() {
  useImageGeneration();
  const [, dispatch] = useAtom(generatedImagesAtom);

  const addNewImageGeneration = (generationOptions: GenerationOptions) => {
    const generationId = uuidv4();

    const newImages: GeneratedImage[] = Array.from({ length: generationOptions.numImages }, () => ({
      id: uuidv4(),
      generationId,
      state: 'pending',
      locallySaved: false,
      usedOptions: generationOptions,
      image: '',
      revisedPrompt: '',
      error: '',
      cost: 0,
      createdAt: new Date(),
    }));

    dispatch({
      type: 'ADD_IMAGES',
      images: newImages,
    });
  };

  return addNewImageGeneration;
}
