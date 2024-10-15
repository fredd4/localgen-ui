import {
  ImageGenOptions,
  ImageGenOptionsToggle,
} from "@/components/App/ImageGeneration/ImageGenOptions";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useGenerateImages } from "@/hooks/useGenerateImages";
import { useGenerationOptions } from "@/hooks/useGenerationOptions";
import { motion } from "framer-motion";
import { useEffect } from "preact/hooks";
import ActionRow from "./ActionRow";
import ImageCard from "./ImageCard";

const ImageGeneration = () => {
  const { error, generatedImages } = useGenerateImages();

  const {
    setPrice,
    showSettings,
    toggleShowSettings,
    generationOptions,
    setGenerationOptions,
  } = useGenerationOptions();

  useEffect(() => {
    console.log("generationOptions", generationOptions);
  }, [generationOptions]);

  return (
    <>
      <Card className="relative">
        <CardHeader>
          <div className="flex flex-row items-center justify-between">
            <CardTitle>Image Generation</CardTitle>
            <ImageGenOptionsToggle
              showSettings={showSettings}
              toggleShowSettings={toggleShowSettings}
            />
          </div>
        </CardHeader>
        <CardContent className="flex space-x-4">
          <div className="flex-1">
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
              className="min-h-[225px]"
            />
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
        <div className="grid gap-4">
          {generatedImages.length > 0 && (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {generatedImages.map((img, index) => (
                <ImageCard key={index} img={img} index={index} />
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </>
  );
};

export default ImageGeneration;
