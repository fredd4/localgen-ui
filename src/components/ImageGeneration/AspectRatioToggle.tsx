import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { aspectRatios } from "@/config/imageGeneration";
import type { AspectRatioValue } from "@/types";

interface AspectRatioToggleProps {
  aspectRatio: AspectRatioValue;
  setAspectRatio: (aspectRatio: AspectRatioValue) => void;
  disabled?: boolean;
}

type AspectRatioSetting = (typeof aspectRatios)[number];

const AspectRatioToggleItem = ({
  aspectRatioSetting,
  disabled,
}: Readonly<{ aspectRatioSetting: AspectRatioSetting; disabled?: boolean }>) => {
  return (
    <ToggleGroupItem
      value={aspectRatioSetting.value}
      aria-label={aspectRatioSetting.label}
      className="flex h-fit flex-col items-center justify-center space-y-1 py-3"
      disabled={disabled}
    >
      <span>
        <aspectRatioSetting.Icon />
      </span>
      <span className="text-sm">{aspectRatioSetting.label}</span>
      <span className="text-xs text-gray-500">
        {aspectRatioSetting.description}
      </span>
    </ToggleGroupItem>
  );
};

export const AspectRatioToggle = ({
  aspectRatio,
  setAspectRatio,
  disabled = false,
}: Readonly<AspectRatioToggleProps>) => {
  return (
    <ToggleGroup
      type="single"
      value={aspectRatio}
      onValueChange={setAspectRatio}
      className="justify-start"
      disabled={disabled}
    >
      {aspectRatios.map((aspectRatioSetting) => (
        <AspectRatioToggleItem
          key={aspectRatioSetting.value}
          aspectRatioSetting={aspectRatioSetting}
          disabled={disabled}
        />
      ))}
    </ToggleGroup>
  );
};
