import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { aspectRatios } from "@/config/image-generation";
import type { AspectRatioValue, AspectRatioSetting } from "@/types";

interface AspectRatioToggleProps {
  aspectRatio: AspectRatioValue;
  setAspectRatio: (aspectRatio: AspectRatioValue) => void;
}

const AspectRatioToggleItem = ({ aspectRatioSetting }: Readonly<{ aspectRatioSetting: AspectRatioSetting }>) => {
  return (
    <ToggleGroupItem
      value={aspectRatioSetting.value}
      aria-label={aspectRatioSetting.label}
      className="flex flex-col items-center justify-center space-y-1 h-fit py-3"
    >
      <span><aspectRatioSetting.Icon /></span>
      <span className="text-sm">{aspectRatioSetting.label}</span>
      <span className="text-xs text-gray-500">{aspectRatioSetting.description}</span>
    </ToggleGroupItem>
  );
}

  export const AspectRatioToggle = ({ aspectRatio, setAspectRatio }: Readonly<AspectRatioToggleProps>) => {
    return (
      <ToggleGroup type="single" value={aspectRatio} onValueChange={setAspectRatio} className="justify-start">
        {aspectRatios.map((aspectRatioSetting) => (
          <AspectRatioToggleItem key={aspectRatioSetting.value} aspectRatioSetting={aspectRatioSetting} />
        ))}
      </ToggleGroup>
    )
  }