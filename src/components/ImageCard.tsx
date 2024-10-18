import { placeHolderSvgBase64 } from "@/assets/placeholderSvg";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getFormattedDate } from "@/lib/utils";
import { GeneratedImage } from "@/types";
import {
  AlertTriangleIcon,
  DownloadIcon,
  ExpandIcon,
  InfoIcon,
  LoaderIcon,
  Trash2Icon
} from "lucide-react";
import { useState } from "react";

interface ImageCardProperties {
  generatedImage: GeneratedImage;
}

export default function ImageCard({
  generatedImage,
}: Readonly<ImageCardProperties>) {
  const [showRevisedPrompt, setShowRevisedPrompt] = useState(false);
  const onDownloadIcon = () => { };
  const onFullscreen = () => { };
  const onDelete = () => { };

  return (
    <Card className="w-full max-w-md overflow-hidden transition-shadow hover:shadow-lg">
      <CardContent className="relative p-0">
        <div className="relative h-64 w-full">
          {generatedImage.state !== "error" && (
            <img
              src={
                generatedImage.state === "pending" ?
                  placeHolderSvgBase64 :
                  generatedImage.image
              }
          alt={generatedImage.usedOptions.prompt}
          className="h-64 w-full object-cover"
            />)}
          {generatedImage.state === "pending" && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center w-full h-full text-foreground text-lg font-bold">
              <LoaderIcon className="h-14 w-14 animate-spin text-gray-500" />
            </div>
          )}
        </div>
        {!generatedImage.locallySaved && (
          <Badge variant="warning" className="absolute right-2 top-2">
            <AlertTriangleIcon className="mr-1 h-4 w-4" />
            Not Saved Locally
          </Badge>
        )}
        {generatedImage.error !== "" && (
          <Badge variant="destructive" className="absolute right-2 top-2">
            Error
          </Badge>
        )}
      </CardContent>
      <CardContent className="p-4">
        <ScrollArea className="h-20">
          <p className="text-sm text-muted-foreground">
            {showRevisedPrompt
              ? generatedImage.revisedPrompt
              : generatedImage.usedOptions.prompt}
          </p>
        </ScrollArea>
        <div className="mt-2 flex items-center justify-between">
          <span className="text-xs text-muted-foreground">
            {getFormattedDate(generatedImage.createdAt)}
          </span>
          <div className="flex items-center space-x-2">
            <Button
              variant="link"
              size="sm"
              onClick={() => setShowRevisedPrompt(!showRevisedPrompt)}
            >
              {showRevisedPrompt ? (
                <span>Show Original Prompt</span>
              ) : (
                <span>Show Revised Prompt</span>
              )}
            </Button>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between bg-muted/50 p-4">
        <div className="flex space-x-2">
          <Button variant="outline" size="icon" onClick={onDownloadIcon}>
            <DownloadIcon className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={onFullscreen}>
            <ExpandIcon className="h-4 w-4" />
          </Button>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="icon">
                <InfoIcon className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="grid gap-2">
                <div className="flex justify-between">
                  <span>Style:</span>
                  <span className="font-medium">
                    {generatedImage.usedOptions.style}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>HD:</span>
                  <span className="font-medium">
                    {generatedImage.usedOptions.hdQuality ? "Yes" : "No"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Aspect Ratio:</span>
                  <span className="font-medium">
                    {generatedImage.usedOptions.aspectRatio}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Model:</span>
                  <span className="font-medium">
                    {generatedImage.usedOptions.model}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Cost:</span>
                  <span className="font-medium">
                    ${generatedImage.cost.toFixed(2)}
                  </span>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
        <Button variant="destructive" size="icon" onClick={onDelete}>
          <Trash2Icon className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}
