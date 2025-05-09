import { fetchImage } from "@/lib/api/fetchImage";
import { addImage as saveImageLocally } from "@/lib/idb/imageStore";
import { generatedImagesAtom } from "@/store/atoms";
import { GeneratedImage } from "@/types";
import { useAtom } from "jotai";
import { useEffect } from "react";
import { useLoadApiKey } from "./useLoadApiKey";

export function useImageGeneration() {
  const [images, dispatch] = useAtom(generatedImagesAtom);
  const { apiKey } = useLoadApiKey();

  useEffect(() => {
    const pendingImages = images.filter(
      (image) => image.state === "pending" && !image.isProcessing
    );

    pendingImages.forEach((image) => {
      dispatch({
        type: "UPDATE_IMAGE",
        id: image.id,
        data: { isProcessing: true },
      });

      (async () => {
        try {
          // Generate the image with the prompt in the options
          // (which may be an enhanced prompt if agentMode was used)
          const result = await fetchImage(image.usedOptions, apiKey);
          
          // Update image with result but don't create unnecessary copies
          const updatedImage: Partial<GeneratedImage> = {
            image: result.url,
            revisedPrompt: image.revisedPrompt || result.revisedPrompt,
            state: "generated",
            cost: result.cost,
          };

          // Update the image in state with minimal duplication
          dispatch({
            type: "UPDATE_IMAGE",
            id: image.id,
            data: updatedImage,
          });

          // After successfully updating state, update IndexedDB
          await saveImageLocally({ 
            ...image, 
            ...updatedImage, 
            locallySaved: true 
          });

          // Mark as saved in state
          dispatch({
            type: "UPDATE_IMAGE",
            id: image.id,
            data: {
              state: "saved",
              locallySaved: true,
            },
          });
        } catch (error) {
          dispatch({
            type: "UPDATE_IMAGE",
            id: image.id,
            data: {
              state: "error",
              error: (error as Error).message,
            },
          });
        } finally {
          dispatch({
            type: "UPDATE_IMAGE",
            id: image.id,
            data: { isProcessing: false },
          });
        }
      })();
    });
  }, [images, dispatch, apiKey]);
}
