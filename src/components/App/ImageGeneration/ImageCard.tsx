import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MaximizeIcon, RotateCwIcon } from 'lucide-react';

interface ImageCardProps {
  img: string;
  index: number;
}

const ImageCard = ({ img, index }: ImageCardProps) => (
  <Card key={index} className="bg-gray-800 border-gray-700 overflow-hidden">
    <CardContent className="p-2">
      <img src={img} alt={`Generated image ${index + 1}`} className="w-full h-auto rounded-md" />
    </CardContent>
    <CardFooter className="flex justify-between bg-gray-700">
      <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white">
        <RotateCwIcon className="w-4 h-4 mr-2" />
        Rotate
      </Button>
      <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white">
        <MaximizeIcon className="w-4 h-4 mr-2" />
        View Full Size
      </Button>
    </CardFooter>
  </Card>
);

export default ImageCard;
