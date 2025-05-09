import { Dialog } from "@/components/ui/dialog";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Download, ZoomIn, ZoomOut } from "lucide-react";
import { downloadBase64Image } from "@/lib/utils";

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  altText?: string;
  downloadFilename?: string;
}

export function ImageModal({
  isOpen,
  onClose,
  imageUrl,
  altText = "Image",
  downloadFilename = "image.png",
}: ImageModalProps) {
  const [zoomLevel, setZoomLevel] = useState(1);
  
  // Reset zoom level when modal opens
  useEffect(() => {
    if (isOpen) {
      setZoomLevel(1);
    }
  }, [isOpen]);

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 0.25, 3));
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 0.25, 0.5));
  };

  const handleDownload = () => {
    downloadBase64Image(imageUrl, downloadFilename);
  };

  return (
    <Dialog 
      isOpen={isOpen} 
      onClose={onClose} 
      className="bg-background/95 rounded-lg"
    >
      <div className="flex flex-col w-full h-full">
        {/* Image Container with Fixed Height */}
        <div className="relative w-full" style={{ height: "calc(80vh - 80px)" }}>
          <div className="absolute inset-0 flex items-center justify-center overflow-auto">
            <img 
              src={imageUrl} 
              alt={altText} 
              style={{ 
                transform: `scale(${zoomLevel})`,
                transformOrigin: 'center',
                transition: 'transform 0.2s ease-in-out',
              }}
              className="max-h-full max-w-full object-contain"
            />
          </div>
        </div>
        
        {/* Controls Bar Fixed at Bottom */}
        <div className="sticky bottom-0 left-0 right-0 bg-background py-4 px-4 border-t flex items-center justify-center">
          <div className="flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-background shadow">
            <Button variant="outline" size="icon" onClick={handleZoomOut}>
              <ZoomOut className="h-4 w-4" />
            </Button>
            <div className="text-sm font-medium px-2 min-w-[50px] text-center">
              {Math.round(zoomLevel * 100)}%
            </div>
            <Button variant="outline" size="icon" onClick={handleZoomIn}>
              <ZoomIn className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={handleDownload}>
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </Dialog>
  );
} 