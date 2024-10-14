import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MaximizeIcon, RotateCwIcon } from "lucide-react";

interface ImageCardProps {
  img: string;
  index: number;
}

const ImageCard = ({ img, index }: ImageCardProps) => (
  <Card key={index} className="overflow-hidden border-gray-700 bg-gray-800">
    <CardContent className="p-2">
      <img
        src={img}
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
