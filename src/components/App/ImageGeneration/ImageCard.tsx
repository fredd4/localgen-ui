import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface ImageCardProps {
  img: string;
  index: number;
}

const ImageCard = ({ img, index }: ImageCardProps) => (
  <Card>
    <CardContent className="p-2">
      <img src={img} alt={`Generated image ${index + 1}`} className="w-full h-auto" />
    </CardContent>
    <CardFooter className="flex justify-between">
      <Button variant="outline" size="sm">Rotate</Button>
      <Button variant="outline" size="sm">View Full Size</Button>
    </CardFooter>
  </Card>
);

export default ImageCard;
