import { clearImages, getAllImages, removeImage } from "@/lib/idb/imageStore";
import {
  savedImagesAtom,
  savedImagesCostAtom,
  savedImagesCountAtom,
} from "@/store/atoms";
import { useAtom, useAtomValue } from "jotai";
import { useEffect } from "react";

export const useManageSavedImages = () => {
  const [savedImages, dispatch] = useAtom(savedImagesAtom);
  const savedImagesCount = useAtomValue(savedImagesCountAtom);
  const savedImagesCost = useAtomValue(savedImagesCostAtom);

  const deleteSavedImage = (id: string) => {
    dispatch({
      type: "DELETE_IMAGE",
      id,
    });
    removeImage(id);
  };

  const clearAllSavedImages = async () => {
    try {
      await clearImages();
      dispatch({ type: "SET_IMAGES", images: [] });
    } catch (error) {
      console.error("Error clearing saved images:", error);
    }
  };

  const loadSavedImages = async () => {
    try {
      const loadedImages = await getAllImages();
      dispatch({ type: "SET_IMAGES", images: loadedImages });
    } catch (error) {
      console.error("Error loading saved images:", error);
    }
  };

  useEffect(() => {
    loadSavedImages();
  }, []);

  return { 
    savedImages, 
    savedImagesCount, 
    savedImagesCost, 
    loadSavedImages, 
    deleteSavedImage,
    clearAllSavedImages 
  };
};
