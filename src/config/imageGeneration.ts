import {
  RectangleHorizontalIcon,
  RectangleVerticalIcon,
  SquareIcon,
} from "lucide-react";

export const aspectRatios = [
  {
    value: "square",
    label: "Square",
    description: "1024x1024",
    Icon: SquareIcon,
  },
  {
    value: "horizontal",
    label: "Horizontal",
    description: "1792×1024",
    Icon: RectangleHorizontalIcon,
  },
  {
    value: "vertical",
    label: "Vertical",
    description: "1024×1792",
    Icon: RectangleVerticalIcon,
  },
] as const;
