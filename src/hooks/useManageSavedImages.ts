import { getAllImages } from "@/lib/idb/imageStore";
import { savedImagesAtom } from "@/store/atoms";
import { useSetAtom } from "jotai";

export const useManageSavedImages = () => {
    const loadSavedImages = async () => {
        const setSavedImages = useSetAtom(savedImagesAtom);
        const loadedImages = await getAllImages();
        setSavedImages(loadedImages);
    };

    return loadSavedImages;
}