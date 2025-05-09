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
import { useManageImageGeneration } from "@/hooks/useManageImageGeneration";
import { useManageSavedImages } from "@/hooks/useManageSavedImages";
import { downloadBase64Image, getFormattedDate, openImageInNewTab, promptToFilename } from "@/lib/utils";
import { activeTabAtom, referenceImageAtom } from "@/store/atoms";
import { GeneratedImage } from "@/types";
import {
  AlertTriangleIcon,
  DownloadIcon,
  ExpandIcon,
  InfoIcon,
  LoaderIcon,
  Trash2Icon,
  WandIcon,
} from "lucide-react";
import { useState } from "react";
import { ImageModal } from "./ImageModal";
import { useSetAtom } from "jotai";

interface ImageCardProperties {
  generatedImage: GeneratedImage;
}

export default function ImageCard({
  generatedImage,
}: Readonly<ImageCardProperties>) {
  const [showImageModal, setShowImageModal] = useState(false);
  const { removeImageGeneration } = useManageImageGeneration();
  const { deleteSavedImage } = useManageSavedImages();
  const setReferenceImage = useSetAtom(referenceImageAtom);
  const setActiveTab = useSetAtom(activeTabAtom);
  
  const onDownloadIcon = () => {
    const filename = `${generatedImage.usedOptions.model
      }-${promptToFilename(getFormattedDate(generatedImage.createdAt) +
        "-" + generatedImage.usedOptions.prompt)
      }.png`;
    downloadBase64Image(
      generatedImage.image,
      filename
    );
  };

  const onFullscreen = () => {
    openImageInNewTab(generatedImage.image);
  };

  const onDelete = () => {
    removeImageGeneration(generatedImage.id);
    if (generatedImage.locallySaved) {
      deleteSavedImage(generatedImage.id)
    }
  };

  const onUseAsReference = () => {
    // Set the reference image and switch to the create tab
    setReferenceImage(generatedImage.image);
    setActiveTab("create");
  };

  const handleImageClick = () => {
    if (generatedImage.state !== "pending" && generatedImage.state !== "error") {
      setShowImageModal(true);
    }
  };

  const downloadFilename = `${generatedImage.usedOptions.model}-${promptToFilename(
    getFormattedDate(generatedImage.createdAt) + "-" + generatedImage.usedOptions.prompt
  )}.png`;

  // Use a more memory-efficient approach for the image source
  const imageSource = generatedImage.state === "pending"
    ? placeHolderSvgBase64
    : generatedImage.image;

  return (
    <>
      <Card className="w-full overflow-hidden transition-shadow hover:shadow-lg flex flex-col">
        <CardContent className="relative p-0 flex-grow">
          <div className="relative w-full flex justify-center">
            {generatedImage.state !== "error" && (
              <img
                src={imageSource}
                alt={generatedImage.usedOptions.prompt}
                className="w-full object-contain transition-transform hover:scale-[1.02] cursor-pointer"
                style={{ 
                  minHeight: "200px", 
                  maxHeight: "300px", // Reduced from 500px to help with memory
                  backgroundColor: "rgba(0, 0, 0, 0.02)"
                }}
                onClick={handleImageClick}
                loading="lazy" // Lazy loading helps with memory usage
                decoding="async" // Allow browser to decode images asynchronously
              />
            )}
            {generatedImage.state === "pending" && (
              <div className="absolute left-1/2 top-1/2 flex h-full w-full -translate-x-1/2 -translate-y-1/2 items-center justify-center text-lg font-bold text-foreground">
                <LoaderIcon className="h-14 w-14 animate-spin text-gray-500" />
              </div>
            )}
          </div>
          {generatedImage.state === "error" && (
            <p className="text-red-500">{generatedImage.error}</p>
          )}

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
              {generatedImage.usedOptions.prompt}
            </p>
          </ScrollArea>
          <div className="mt-2 flex items-center justify-between">
            <span className="text-xs text-muted-foreground">
              {getFormattedDate(generatedImage.createdAt)}
            </span>
            <div className="flex items-center space-x-2"></div>
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
            <Button 
              variant="outline" 
              size="icon" 
              onClick={onUseAsReference}
              title="Use as reference image"
              disabled={generatedImage.state === "pending" || generatedImage.state === "error"}
            >
              <WandIcon className="h-4 w-4" />
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
                    <span>Quality:</span>
                    <span className="font-medium">
                      <span className={
                        generatedImage.usedOptions.quality === "high" 
                          ? "text-green-600" 
                          : generatedImage.usedOptions.quality === "medium"
                            ? "text-blue-600"
                            : "text-amber-600"
                      }>
                        {generatedImage.usedOptions.quality.charAt(0).toUpperCase() + generatedImage.usedOptions.quality.slice(1)}
                      </span>
                      <span className="ml-1 text-xs text-muted-foreground">
                        ({generatedImage.usedOptions.quality === "high" 
                          ? "$0.167-$0.25" 
                          : generatedImage.usedOptions.quality === "medium"
                            ? "$0.042-$0.063"
                            : "$0.011-$0.016"})
                      </span>
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Transparency:</span>
                    <span className="font-medium">
                      {generatedImage.usedOptions.transparency ? "On" : "Off"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Moderation:</span>
                    <span className="font-medium">
                      {generatedImage.usedOptions.moderation || "Low"}
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

      <ImageModal
        isOpen={showImageModal}
        onClose={() => setShowImageModal(false)}
        imageUrl={generatedImage.image}
        altText={generatedImage.usedOptions.prompt}
        downloadFilename={downloadFilename}
      />
    </>
  );
}
