import ImageCard from "@/components/ImageCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useManageSavedImages } from "@/hooks/useManageSavedImages";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Number of images to display per page
const IMAGES_PER_PAGE = 10;

const History = () => {
  const { savedImages } = useManageSavedImages();
  const [currentPage, setCurrentPage] = useState(1);

  // Sort images by creation date, newest first
  const sortedImages = [...savedImages].sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  // Calculate pagination values
  const totalImages = sortedImages.length;
  const totalPages = Math.ceil(totalImages / IMAGES_PER_PAGE);
  
  // Get current page's images
  const indexOfLastImage = currentPage * IMAGES_PER_PAGE;
  const indexOfFirstImage = indexOfLastImage - IMAGES_PER_PAGE;
  const currentImages = sortedImages.slice(indexOfFirstImage, indexOfLastImage);

  // Change page
  const goToNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  };

  const goToPreviousPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };

  const goToPage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPageButtons = 5; // Maximum number of page buttons to show
    
    let startPage = Math.max(1, currentPage - Math.floor(maxPageButtons / 2));
    let endPage = startPage + maxPageButtons - 1;
    
    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - maxPageButtons + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }
    
    return pageNumbers;
  };

  return (
    <Card>
      <CardContent className="mt-4">
        {savedImages.length === 0 ? (
          <p>No images have been generated yet.</p>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
              {currentImages.map((image) => (
                <ImageCard key={image.id} generatedImage={image} />
              ))}
            </div>
            
            {totalPages > 1 && (
              <div className="flex justify-center mt-8">
                <div className="flex items-center space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={goToPreviousPage} 
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  
                  {getPageNumbers().map(number => (
                    <Button
                      key={number}
                      variant={currentPage === number ? "default" : "outline"}
                      size="sm"
                      onClick={() => goToPage(number)}
                    >
                      {number}
                    </Button>
                  ))}
                  
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={goToNextPage} 
                    disabled={currentPage === totalPages}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
            
            <div className="text-center text-sm text-muted-foreground mt-4">
              Showing {indexOfFirstImage + 1}-{Math.min(indexOfLastImage, totalImages)} of {totalImages} images
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default History;
