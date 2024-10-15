import { atom } from 'jotai';
import { generatedImagesAtom } from './atoms';
import { GeneratedImage } from '@/types';

export const imagesByStateAtom = atom((get) => {
  const images = get(generatedImagesAtom);
  return images.reduce((acc, image) => {
    if (!acc[image.state]) {
      acc[image.state] = [];
    }
    acc[image.state].push(image);
    return acc;
  }, {} as Record<string, GeneratedImage[]>);
});
