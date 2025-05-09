import ImageCard from "@/components/ImageCard";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useGenerationOptions } from "@/hooks/useGenerationOptions";
import { generatedImagesAtom, referenceImageAtom } from "@/store/atoms";
import { motion } from "framer-motion";
import { useAtom, useAtomValue } from "jotai";
import { useEffect, useState } from "react";
import ActionRow from "./ActionRow";
import { ImageGenOptions } from "./ImageGenOptions";
import { Button } from "@/components/ui/button";
import { ImageIcon, XIcon } from "lucide-react";
import { AgentModeToggle } from "./AgentModeToggle";

const ImageGeneration = () => {
  const generatedImages = useAtomValue(generatedImagesAtom);
  const [error] = useState(false); /* TODO: Display Errors properly */
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [referenceImage, setReferenceImage] = useAtom(referenceImageAtom);

  const { price, showSettings, generationOptions, setGenerationOptions } =
    useGenerationOptions();

  // Check for reference image when component mounts or referenceImage changes
  useEffect(() => {
    if (referenceImage) {
      setPreviewImage(referenceImage);
      setGenerationOptions({
        ...generationOptions,
        imageInput: referenceImage,
      });
      // Clear the reference image atom so it doesn't persist if user navigates away and back
      setReferenceImage(null);
    }
  }, [referenceImage, setGenerationOptions, generationOptions, setReferenceImage]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;
    
    const file = input.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (!event.target || !event.target.result) return;
        const base64Image = event.target.result as string;
        setPreviewImage(base64Image);
        setGenerationOptions({
          ...generationOptions,
          imageInput: base64Image,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const removeUploadedImage = () => {
    setPreviewImage(null);
    setGenerationOptions({
      ...generationOptions,
      imageInput: undefined,
    });
  };

  return (
    <>
      <Card className="relative">
        <CardContent className="flex space-x-4 pt-6">
          <div className="relative flex-1">
            <div className="flex flex-col space-y-3">
              {previewImage && (
                <div className="relative">
                  <img 
                    src={previewImage} 
                    alt="Uploaded image" 
                    className="max-h-48 rounded-md object-contain"
                  />
                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute right-2 top-2"
                    onClick={removeUploadedImage}
                  >
                    <XIcon className="h-4 w-4" />
                  </Button>
                </div>
              )}
              
              <div className="mb-2">
                <AgentModeToggle />
              </div>

              <div className="flex gap-2">
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
                <div className="flex flex-col">
                  <input
                    type="file"
                    id="image-upload"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                  <Button
                    variant="outline"
                    className="h-10 w-10 p-0"
                    onClick={() => document.getElementById("image-upload")?.click()}
                    title="Upload an image as input"
                  >
                    <ImageIcon className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
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
        <div id="generated-images-section" className="mt-4 grid gap-6">
          {generatedImages.length > 0 && (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
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
