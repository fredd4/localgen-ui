import { generatedImagesAtom, promptEnhancingAtom } from "@/store/atoms";
import { GeneratedImage, GenerationOptions } from "@/types";
import { useAtom } from "jotai";
import { v4 as uuidv4 } from "uuid";
import { useImageGeneration } from "./useImageGeneration";
import { getEnhancedPrompts } from "@/lib/api/getEnhancedPrompts";
import { useLoadApiKey } from "./useLoadApiKey";

export function useManageImageGeneration() {
  useImageGeneration();
  const [, dispatch] = useAtom(generatedImagesAtom);
  const [, setIsEnhancing] = useAtom(promptEnhancingAtom);
  const { apiKey } = useLoadApiKey();

  const addNewImageGeneration = async (generationOptions: GenerationOptions) => {
    const generationId = uuidv4();

    if (generationOptions.agentMode) {
      try {
        // Set enhancing status to true
        setIsEnhancing(true);

        // Get enhanced prompts from OpenAI, passing the image input if it exists
        // Note: In agent mode, OpenAI might return more creative variations than the requested numImages
        const { prompts } = await getEnhancedPrompts(
          generationOptions.prompt,
          generationOptions.numImages,
          apiKey,
          generationOptions.promptEnhancementModel,
          generationOptions.imageInput
        );
        
        // Reset enhancing status
        setIsEnhancing(false);

        // Create images for each enhanced prompt, even if more were returned than requested
        // This is a feature of agent mode - it provides multiple creative variations
        const newImages: GeneratedImage[] = prompts.map((enhancedPrompt) => ({
          id: uuidv4(),
          generationId,
          state: "pending",
          locallySaved: false,
          usedOptions: {
            ...generationOptions,
            prompt: enhancedPrompt.prompt,
            numImages: 1, // Each enhanced prompt gets one image
            aspectRatio: enhancedPrompt.aspectRatio, // Use OpenAI's suggested aspect ratio
            transparency: enhancedPrompt.transparency, // Use OpenAI's transparency decision
            // Keep the original image input to use as reference
            imageInput: generationOptions.imageInput 
          },
          image: "",
          revisedPrompt: enhancedPrompt.description,
          error: "",
          cost: 0,
          createdAt: new Date(),
        }));

        dispatch({
          type: "ADD_IMAGES",
          images: newImages,
        });
      } catch (error) {
        // Reset enhancing status on error
        setIsEnhancing(false);
        
        // Fall back to standard generation if prompt enhancement fails
        console.error("Failed to enhance prompts:", error);
        
        // Create a single error image to show the error
        const errorImage: GeneratedImage = {
          id: uuidv4(),
          generationId,
          state: "error",
          locallySaved: false,
          usedOptions: generationOptions,
          image: "",
          revisedPrompt: "",
          error: `Failed to generate enhanced prompts: ${(error as Error).message}`,
          cost: 0,
          createdAt: new Date(),
        };
        
        dispatch({
          type: "ADD_IMAGES",
          images: [errorImage],
        });
      }
    } else {
      // Standard generation without agent mode
      const newImages: GeneratedImage[] = Array.from(
        { length: generationOptions.numImages },
        () => ({
          id: uuidv4(),
          generationId,
          state: "pending",
          locallySaved: false,
          usedOptions: generationOptions,
          image: "",
          revisedPrompt: "",
          error: "",
          cost: 0,
          createdAt: new Date(),
        })
      );

      dispatch({
        type: "ADD_IMAGES",
        images: newImages,
      });
    }
  };

  const removeImageGeneration = (id: string) => {
    dispatch({
      type: "DELETE_IMAGE",
      id,
    });
  };

  return { addNewImageGeneration, removeImageGeneration };
}
