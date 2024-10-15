// src/store/reducers.ts
import { GeneratedImage } from "@/types";
import { GeneratedImageAction } from "./actions";

export function generatedImagesReducer(
  state: GeneratedImage[],
  action: GeneratedImageAction
): GeneratedImage[] {
  switch (action.type) {
    case 'ADD_IMAGES':
      return [...state, ...action.images];
    case 'UPDATE_IMAGE':
      return state.map(image =>
        image.id === action.id ? { ...image, ...action.data } : image
      );
    default:
      return state;
  }
}
