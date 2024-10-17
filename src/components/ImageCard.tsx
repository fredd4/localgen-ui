import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ScrollArea } from "@/components/ui/scroll-area"
import { getFormattedDate } from '@/lib/utils'
import { GeneratedImage } from "@/types"
import { AlertTriangleIcon, DownloadIcon, ExpandIcon, InfoIcon, Trash2Icon } from "lucide-react"
import { useState } from "react"

interface ImageCardProperties {
  generatedImage: GeneratedImage,
}

export default function ImageCard({
  generatedImage,
}: Readonly<ImageCardProperties>) {
  const [showRevisedPrompt, setShowRevisedPrompt] = useState(false)
  const onDownloadIcon = () => { };
  const onFullscreen = () => { };
  const onDelete = () => { };

  return (
    <Card className="w-full max-w-md overflow-hidden transition-shadow hover:shadow-lg">
      <CardContent className="p-0 relative">
        <img src={generatedImage.image} alt={generatedImage.usedOptions.prompt} className="w-full h-64 object-cover" />
        {!generatedImage.locallySaved && (
          <Badge variant="warning" className="absolute top-2 right-2">
            <AlertTriangleIcon className="w-4 h-4 mr-1" />
            Not Saved Locally
          </Badge>
        )}
        {(generatedImage.error !== "") && (
          <Badge variant="destructive" className="absolute top-2 right-2">
            Error
          </Badge>
        )}
      </CardContent>
      <CardContent className="p-4">
        <ScrollArea className="h-20">
          <p className="text-sm text-muted-foreground">
            {showRevisedPrompt ? generatedImage.revisedPrompt : generatedImage.usedOptions.prompt}
          </p>
        </ScrollArea>
        <div className="flex items-center justify-between mt-2">
          <span className="text-xs text-muted-foreground">
            {getFormattedDate(generatedImage.createdAt)}
          </span>
          <div className="flex items-center space-x-2">
            <Button variant="link" size="sm" onClick={() => setShowRevisedPrompt(!showRevisedPrompt)}>
              {showRevisedPrompt ? (
                <span>Show Original Prompt</span>
              ) : (
                <span>Show Revised Prompt</span>
              )}
            </Button>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between p-4 bg-muted/50">
        <div className="flex space-x-2">
          <Button variant="outline" size="icon" onClick={onDownloadIcon}>
            <DownloadIcon className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={onFullscreen}>
            <ExpandIcon className="w-4 h-4" />
          </Button>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="icon">
                <InfoIcon className="w-4 h-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="grid gap-2">
                <div className="flex justify-between">
                  <span>Style:</span>
                  <span className="font-medium">{generatedImage.usedOptions.style}</span>
                </div>
                <div className="flex justify-between">
                  <span>HD:</span>
                  <span className="font-medium">{generatedImage.usedOptions.hdQuality ? 'Yes' : 'No'}</span>
                </div>
                <div className="flex justify-between">
                  <span>Aspect Ratio:</span>
                  <span className="font-medium">{generatedImage.usedOptions.aspectRatio}</span>
                </div>
                <div className="flex justify-between">
                  <span>Model:</span>
                  <span className="font-medium">{generatedImage.usedOptions.model}</span>
                </div>
                <div className="flex justify-between">
                  <span>Cost:</span>
                  <span className="font-medium">${generatedImage.cost.toFixed(2)}</span>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
        <Button variant="destructive" size="icon" onClick={onDelete}>
          <Trash2Icon className="w-4 h-4" />
        </Button>
      </CardFooter>
    </Card>
  )
}