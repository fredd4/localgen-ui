import { getAllImages, removeImage } from "@/lib/idb/imageStore";
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

  const loadSavedImages = async () => {
    const loadedImages = await getAllImages();
    dispatch({ type: "SET_IMAGES", images: loadedImages });
  };

  useEffect(() => {
    loadSavedImages();
  }, []);

  return { savedImages, savedImagesCount, savedImagesCost, loadSavedImages, deleteSavedImage };
};
