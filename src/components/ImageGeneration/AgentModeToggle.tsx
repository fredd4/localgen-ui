import { generationOptionsAtom, promptEnhancingAtom } from "@/store/atoms";
import { useAtom } from "jotai";
import { BotIcon, InfoIcon, SparklesIcon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Loader2 } from "lucide-react";
import { useState } from "react";

export function AgentModeToggle() {
  const [generationOptions, setGenerationOptions] = useAtom(generationOptionsAtom);
  const [isEnhancing] = useAtom(promptEnhancingAtom);
  const [tooltipOpen, setTooltipOpen] = useState(false);

  const onAgentModeChange = (checked: boolean) => {
    setGenerationOptions({
      ...generationOptions,
      agentMode: checked,
    });
  };

  // Get color based on quality
  const getQualityColor = (quality: string) => {
    switch (quality) {
      case "low": return "text-amber-500";
      case "medium": return "text-blue-500";
      case "high": return "text-green-500";
      default: return "text-gray-500";
    }
  };

  // Get readable quality label
  const getQualityLabel = (quality: string) => {
    switch (quality) {
      case "low": return "Low";
      case "medium": return "Medium";
      case "high": return "High";
      default: return quality;
    }
  };

  const qualityColor = getQualityColor(generationOptions.quality);
  const qualityLabel = getQualityLabel(generationOptions.quality);

  return (
    <div className="flex items-center space-x-2">
      <div className="flex items-center">
        <BotIcon className="mr-1 h-4 w-4 text-primary" />
        <span className="text-sm font-medium">Agent</span>
      </div>
      
      <ToggleGroup
        type="single"
        value={generationOptions.agentMode ? "on" : "off"}
        onValueChange={(value: string) => onAgentModeChange(value === "on")}
        className="justify-start"
      >
        <ToggleGroupItem value="off" aria-label="Off" className="h-7 px-2 text-xs">
          Off
        </ToggleGroupItem>
        <ToggleGroupItem value="on" aria-label="On" className="h-7 px-2 text-xs">
          On
        </ToggleGroupItem>
      </ToggleGroup>

      {/* Quality indicator */}
      <div className="flex items-center">
        <SparklesIcon className="h-3 w-3 mr-1 text-muted-foreground" />
        <span className={`text-xs font-medium ${qualityColor}`}>
          {qualityLabel}
        </span>
      </div>

      <TooltipProvider>
        <Tooltip open={tooltipOpen} onOpenChange={setTooltipOpen}>
          <TooltipTrigger asChild>
            <div 
              className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-full hover:bg-muted"
              onMouseEnter={() => setTooltipOpen(true)}
              onMouseLeave={() => setTooltipOpen(false)}
              onClick={() => setTooltipOpen(!tooltipOpen)}
            >
              <InfoIcon className="h-4 w-4 text-muted-foreground hover:text-primary" />
            </div>
          </TooltipTrigger>
          <TooltipContent side="top" align="center" className="max-w-sm p-0">
            <div className="p-2">
              <p className="text-xs">
                Agent Mode: When enabled, your prompt will be enhanced by GPT
                before generating images. The system will:
              </p>
              <ul className="mt-1 list-disc pl-4 text-xs">
                <li>Create detailed and effective image generation prompts</li>
                <li>Use any uploaded image as a reference throughout the process</li>
              </ul>
              <div className="mt-2 flex flex-col text-xs gap-1">
                <p className="font-medium">Settings:</p>
                <div className="flex items-center justify-between">
                  <span>Model:</span>
                  <span className="font-medium">{generationOptions.promptEnhancementModel}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Quality:</span>
                  <span className={`font-medium ${qualityColor}`}>{qualityLabel}</span>
                </div>
              </div>
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      {isEnhancing && (
        <div className="flex items-center text-xs italic text-muted-foreground">
          <Loader2 className="mr-1 h-3 w-3 animate-spin" />
          Enhancing prompt...
        </div>
      )}
    </div>
  );
} 