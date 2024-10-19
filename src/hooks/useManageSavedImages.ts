import { getAllImages } from "@/lib/idb/imageStore";
import {
  savedImagesAtom,
  savedImagesCostAtom,
  savedImagesCountAtom,
} from "@/store/atoms";
import { useAtom, useAtomValue } from "jotai";
import { useEffect } from "react";

export const useManageSavedImages = () => {
  const [savedImages, setSavedImages] = useAtom(savedImagesAtom);
  const savedImagesCount = useAtomValue(savedImagesCountAtom);
  const savedImagesCost = useAtomValue(savedImagesCostAtom);

  const loadSavedImages = async () => {
    const loadedImages = await getAllImages();
    setSavedImages(loadedImages);
  };

  useEffect(() => {
    loadSavedImages();
  }, []);

  return { savedImages, savedImagesCount, savedImagesCost, loadSavedImages };
};
