import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { StyleValue, type AspectRatioValue } from "@/types";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { useState } from "preact/hooks";
import ImageCard from "./ImageCard";
import { ImageGenOptions, ImageGenOptionsToggle } from "./ImageGenOptions";

const ImageGeneration = () => {
  const [prompt, setPrompt] = useState("");
  const [price, setPrice] = useState(0);
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const toggleShowSettings = () => setShowSettings(!showSettings);

  const [aspectRatio, setAspectRatio] = useState<AspectRatioValue>("square");
  const [style, setStyle] = useState<StyleValue>("vivid");
  const [hdQuality, setHdQuality] = useState(false);
  const [numImages, setNumImages] = useState(1);

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setGeneratedImages([
        "/placeholder.svg?height=512&width=512",
        "/placeholder.svg?height=512&width=512",
        "/placeholder.svg?height=512&width=512",
        "/placeholder.svg?height=512&width=512",
      ]);
      setError("Something went wrong!")
      setIsGenerating(false);
    }, 2000);
  };

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
              value={prompt}
              onChange={(/* e */) => setPrompt("")} /* TODO: Access e.target.value) */
              className="min-h-[200px]"
            />
          </div>
          <div className={`space-y-2 relative`}>
            {showSettings && (
              <ImageGenOptions
                aspectRatio={aspectRatio}
                setAspectRatio={setAspectRatio}
                style={style}
                setStyle={setStyle}
                hdQuality={hdQuality}
                setHdQuality={setHdQuality}
                numImages={numImages}
                setNumImages={setNumImages}
                setPrice={setPrice}
              />
            )}
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleGenerate} disabled={isGenerating} className="w-full">
            {isGenerating ? "Generating..." : "Generate Images"}
            <Sparkles className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
        <div className="absolute bottom-0.5 right-6 flex flex-row items-center gap-2 text-xs">
          <div className="text-foreground">Estimated Cost:</div>
          <div className="text-muted-foreground">${price.toFixed(2)}</div>
        </div>
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
