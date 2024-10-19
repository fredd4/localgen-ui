import { GeneratedImage } from "@/types";

export type GeneratedImageAction =
  | { type: "SET_IMAGES"; images: GeneratedImage[] }
  | { type: "ADD_IMAGES"; images: GeneratedImage[] }
  | { type: "UPDATE_IMAGE"; id: string; data: Partial<GeneratedImage> }
  | { type: "DELETE_IMAGE"; id: string};
