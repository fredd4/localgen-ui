import { useState } from "preact/hooks";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import ImageCard from "./ImageCard";
import { motion } from "framer-motion";

const ImageGeneration = () => {
  const [prompt, setPrompt] = useState("");
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
    <Card>
      <CardHeader>
        <CardTitle>Image Generation</CardTitle>
        <CardDescription>
          Enter a prompt to generate images using DALL-E
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Textarea
          placeholder="Enter your prompt here..."
          value={prompt}
          onChange={(e) => setPrompt("TODO")} /* TODO: Access e.target.value */
          className="min-h-[100px]"
        />
        <div className="flex space-x-4">
          <Select defaultValue="1">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Number of images" />
            </SelectTrigger>
            <SelectContent>
              {[1, 2, 3, 4, 5, 6].map((num) => (
                <SelectItem key={num} value={num.toString()}>
                  {num} image{num > 1 ? "s" : ""}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select defaultValue="1024x1024">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Image size" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="256x256">256x256</SelectItem>
              <SelectItem value="512x512">512x512</SelectItem>
              <SelectItem value="1024x1024">1024x1024</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center space-x-2">
          <Switch id="natural-style" />
          <label htmlFor="natural-style">Use natural style</label>
        </div>
        <div className="flex items-center space-x-2">
          <Switch id="hd-quality" />
          <label htmlFor="hd-quality">HD quality</label>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleGenerate} disabled={isGenerating}>
          {isGenerating ? "Generating..." : "Generate Images"}
        </Button>
      </CardFooter>
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      <motion.div
        className="grid gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {generatedImages.length > 0 && (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {generatedImages.map((img, index) => (
              <ImageCard key={index} img={img} index={index} />
            ))}
          </div>
        )}
      </motion.div>
    </Card>
  );
};

export default ImageGeneration;
