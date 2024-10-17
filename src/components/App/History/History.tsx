import ImageCard from "@/components/ImageCard";
import { Card, CardContent } from "@/components/ui/card";
import { useManageSavedImages } from "@/hooks/useManageSavedImages";
import { savedImagesAtom } from "@/store/atoms";
import { useAtomValue } from "jotai";

const History = () => {
  const savedImages = useAtomValue(savedImagesAtom);
  const loadSavedImages = useManageSavedImages();
  loadSavedImages();

  return (
    <Card>
      <CardContent className="mt-4">
        {
          savedImages.length === 0 ? (
            <p>No images have been generated yet.</p>
          ) : (
            <div className="flex">
              {savedImages.map((image) => (
                <ImageCard key={image.id} generatedImage={image} />
              ))}
            </div>
          )
        }
      </CardContent>
    </Card>
  );
}

export default History;
