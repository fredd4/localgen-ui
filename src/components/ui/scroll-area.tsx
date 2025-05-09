import { forwardRef } from "preact/compat";
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";
import { JSX } from "preact";
import { cn } from "@/lib/utils";
import { SignalLike } from "@/types/preactHelper";

const scrollAreaTypes = ["auto", "always", "scroll", "hover"] as const;
type ScrollAreaType = (typeof scrollAreaTypes)[number];
const typePropertyHelper = (
  type: string | SignalLike<string | undefined> | undefined
) => {
  if (!type || !scrollAreaTypes.includes(type as ScrollAreaType)) {
    if (type !== undefined) {
      console.error(`Invalid ScrollAreaType: ${type}, handling as undefined`);
    }
    return "auto"; // Provide a default value
  }
  return type as ScrollAreaType;
};

const scrollAreaDirections = ["ltr", "rtl"] as const;
type ScrollAreaDirection = (typeof scrollAreaDirections)[number];
const dirPropertyHelper = (
  dir: string | SignalLike<string | undefined> | undefined
) => {
  if (!dir || !scrollAreaDirections.includes(dir as ScrollAreaDirection)) {
    if (dir !== undefined) {
      console.error(`Invalid ScrollAreaDirection: ${dir}, handling as undefined`);
    }
    return "ltr"; // Provide a default value
  }
  return dir as ScrollAreaDirection;
};

const ScrollArea = forwardRef<
  HTMLDivElement, // HTML element that will be used by ScrollAreaPrimitive.Root
  JSX.IntrinsicElements["div"] & { 
    type?: string | SignalLike<string | undefined>;
    dir?: string | SignalLike<string | undefined>;
  }
>(({ className, children, type, dir, ...props }, ref) => (
  <ScrollAreaPrimitive.Root
    ref={ref}
    dir={dirPropertyHelper(dir)}
    type={typePropertyHelper(type)}
    className={cn("relative overflow-hidden", className)}
    {...props}
  >
    <ScrollAreaPrimitive.Viewport className="h-full w-full rounded-[inherit]">
      {children}
    </ScrollAreaPrimitive.Viewport>
    <ScrollBar />
    <ScrollAreaPrimitive.Corner />
  </ScrollAreaPrimitive.Root>
));
ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName;

type ScrollAreaScrollbarProps = JSX.IntrinsicElements["div"] & {
  orientation?: "vertical" | "horizontal"; // Orientation comes from Radix
};

const ScrollBar = forwardRef<HTMLDivElement, ScrollAreaScrollbarProps>(
  ({ className, orientation = "vertical", ...props }, ref) => (
    <ScrollAreaPrimitive.ScrollAreaScrollbar
      ref={ref}
      orientation={orientation}
      className={cn(
        "flex touch-none select-none transition-colors",
        orientation === "vertical" &&
          "h-full w-2.5 border-l border-l-transparent p-[1px]",
        orientation === "horizontal" &&
          "h-2.5 flex-col border-t border-t-transparent p-[1px]",
        className
      )}
      {...props}
    >
      <ScrollAreaPrimitive.ScrollAreaThumb className="relative flex-1 rounded-full bg-border" />
    </ScrollAreaPrimitive.ScrollAreaScrollbar>
  )
);
ScrollBar.displayName = ScrollAreaPrimitive.ScrollAreaScrollbar.displayName;

export { ScrollArea, ScrollBar };
