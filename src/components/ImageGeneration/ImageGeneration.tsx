import ImageCard from "@/components/ImageCard";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useGenerationOptions } from "@/hooks/useGenerationOptions";
import { generatedImagesAtom } from "@/store/atoms";
import { motion } from "framer-motion";
import { useAtomValue } from "jotai";
import { useEffect } from "preact/hooks";
import { useState } from "react";
import ActionRow from "./ActionRow";
import { ImageGenOptions } from "./ImageGenOptions";

const ImageGeneration = () => {
  const generatedImages = useAtomValue(generatedImagesAtom);
  const [error] = useState(false); /* TODO: Display Errors properly */

  const { price, showSettings, generationOptions, setGenerationOptions } =
    useGenerationOptions();

  useEffect(() => {
    console.log("generationOptions", generationOptions);
  }, [generationOptions]);

  return (
    <>
      <Card className="relative">
        <CardContent className="flex space-x-4 pt-6">
          <div className="relative flex-1">
            <Textarea
              id="prompt"
              placeholder="Enter your prompt here..."
              value={generationOptions.prompt}
              onChange={(e) =>
                setGenerationOptions({
                  ...generationOptions,
                  prompt: (e.target as HTMLInputElement).value,
                })
              }
              className="min-h-[260px] sm:min-h-[185px]"
            ></Textarea>
            <div
              className={
                "absolute bottom-1 right-3 flex flex-row items-center gap-2 text-xs sm:hidden" +
                (showSettings && " hidden")
              }
            >
              <div className="text-muted-foreground">Estimated Cost:</div>
              <div className="font-semibold text-muted-foreground">
                ${price.toFixed(2)}
              </div>
            </div>
          </div>
          {showSettings && (
            <div className="relative space-y-2">
              <ImageGenOptions />
            </div>
          )}
        </CardContent>
        <CardFooter>
          <ActionRow />
        </CardFooter>
      </Card>
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mt-4 grid gap-4">
          {generatedImages.length > 0 && (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {generatedImages
                .slice()
                .reverse()
                .map((image, index) => (
                  <ImageCard key={index} generatedImage={image} />
                ))}
            </div>
          )}
        </div>
      </motion.div>
    </>
  );
};

export default ImageGeneration;
