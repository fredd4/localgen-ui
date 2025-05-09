import ImageCard from "@/components/ImageCard";
import { Card, CardContent } from "@/components/ui/card";
import { useManageSavedImages } from "@/hooks/useManageSavedImages";

const History = () => {
  const { savedImages } = useManageSavedImages();

  // Sort images by creation date, newest first
  const sortedImages = [...savedImages].sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <Card>
      <CardContent className="mt-4">
        {savedImages.length === 0 ? (
          <p>No images have been generated yet.</p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
            {sortedImages.map((image) => (
              <ImageCard key={image.id} generatedImage={image} />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default History;
