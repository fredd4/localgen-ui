import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { InteractiveRangeSlider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import type { AspectRatioValue } from "@/types";
import { motion } from "framer-motion";
import { ChevronDown, ChevronUp, Sparkles } from "lucide-react";
import { useState } from "preact/hooks";
import { AspectRatioToggle } from "./AspectRatioToggle";
import ImageCard from "./ImageCard";

const ImageGeneration = () => {
  const [prompt, setPrompt] = useState("");
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const toggleShowSettings = () => setShowSettings(!showSettings);

  const [aspectRatio, setAspectRatio] = useState<AspectRatioValue>("square");
  const [style, setStyle] = useState("vivid");
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
      // setError("Something went wrong!")
      setIsGenerating(false);
    }, 2000);
  };

  return (
    <>
      <Card className="">
        <CardHeader>
          <div className="flex flex-row items-center justify-between">
            <CardTitle>Image Generation</CardTitle>
            <div className="flex flex-row items-center">
              <h4 className="text-sm font-semibold">Generation Options</h4>
              <Button variant="ghost" size="sm" className="w-9 p-0" onClick={toggleShowSettings}>
                {showSettings ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                <span className="sr-only">Toggle settings for image generation</span>
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex space-x-4">
          <div className="flex-1">
            <Textarea
              placeholder="Enter your prompt here..."
              value={prompt}
              onChange={(/* e */) => setPrompt("")} /* TODO: Access e.target.value) */
              className="min-h-[200px]"
            />
          </div>
          <div className={`space-y-2`}>
            {showSettings && (
              <>
                <div className="space-y-2 ">
                  <Label htmlFor="aspect-ratio">Aspect Ratio</Label>
                  <AspectRatioToggle
                    aspectRatio={aspectRatio}
                    setAspectRatio={setAspectRatio}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="style">Style</Label>
                  <ToggleGroup type="single" value={style} onValueChange={setStyle} className="justify-start">
                    <ToggleGroupItem value="natural" aria-label="Natural">
                      Natural
                    </ToggleGroupItem>
                    <ToggleGroupItem value="vivid" aria-label="Vivid">
                      Vivid
                    </ToggleGroupItem>
                  </ToggleGroup>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="num-images">Number of Images: {numImages}</Label>
                  <InteractiveRangeSlider
                    min={1}
                    max={6}
                    step={1}
                    value={numImages}
                    setValue={setNumImages}
                  />
                </div>
                <div className="rounded-lg border p-2 text-sm">
                  <div className="font-semibold">Estimated Cost</div>
                  <div className="text-muted-foreground">$0.00</div>
                </div>
              </>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleGenerate} disabled={isGenerating} className="w-full">
            {isGenerating ? "Generating..." : "Generate Images"}
            <Sparkles className="ml-2 h-4 w-4" />
          </Button>
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
