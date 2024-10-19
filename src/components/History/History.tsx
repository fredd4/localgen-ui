import ImageCard from "@/components/ImageCard";
import { Card, CardContent } from "@/components/ui/card";
import { useManageSavedImages } from "@/hooks/useManageSavedImages";

const History = () => {
  const { savedImages } = useManageSavedImages();

  return (
    <Card>
      <CardContent className="mt-4">
        {savedImages.length === 0 ? (
          <p>No images have been generated yet.</p>
        ) : (
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3">
            {savedImages.map((image) => (
              <ImageCard key={image.id} generatedImage={image} />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default History;
