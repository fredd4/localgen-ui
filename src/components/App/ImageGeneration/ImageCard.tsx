import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MaximizeIcon, RotateCwIcon } from "lucide-react";
import { GeneratedImage } from "@/types";
import { getFormattedDate } from "@/lib/utils";

interface ImageCardProps {
  image: GeneratedImage;
  index: number;
}

const ImageCard = ({ image, index }: ImageCardProps) => (
  <Card key={index} className="overflow-hidden border-gray-700 bg-gray-800">
    <CardContent className="p-2">
      <img
        src={image.image}
        alt={`Generated image ${index + 1}`}
        className="h-auto w-full rounded-md"
      />
    </CardContent>
    <CardFooter className="flex justify-between bg-gray-700">
      <Button
        variant="ghost"
        size="sm"
        className="text-gray-300 hover:text-white"
      >
        <RotateCwIcon className="mr-2 h-4 w-4" />
        Rotate
      </Button>
      <div className="flex flex-col items-center text-xs">
        <span>Date: {getFormattedDate(image.createdAt)}</span>
        <span>GenId: {image.generationId}</span>
        <span>Id: {image.id}</span>
        <span>Cost: ${image.cost.toFixed(2)}</span>
      </div>
      <Button
        variant="ghost"
        size="sm"
        className="text-gray-300 hover:text-white"
      >
        <MaximizeIcon className="mr-2 h-4 w-4" />
        View Full Size
      </Button>
    </CardFooter>
  </Card>
);

export default ImageCard;
