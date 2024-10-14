import { valueHelper } from "@/lib/preactHelper";
import { cn } from "@/lib/utils";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { JSX } from "preact";
import { forwardRef } from "preact/compat";

const Tabs = TabsPrimitive.Root;

const TabsList = forwardRef<
  HTMLDivElement,
  JSX.IntrinsicElements['div']
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ref={ref as any}
    className={cn(
      "inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground",
      className
    )}
    {...props}
  />
));
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = forwardRef<
  HTMLButtonElement,
  JSX.IntrinsicElements['button']
>(({ className, value, ...props }, ref) => (
  <TabsPrimitive.Trigger
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ref={ref as any}
    className={cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow",
      className
    )}
    value={valueHelper(value)}
    {...props}
  />
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = forwardRef<
  HTMLDivElement,
  JSX.IntrinsicElements['div']
>(({ className, value, ...props }, ref) => (
  <TabsPrimitive.Content
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ref={ref as any}
    className={cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className
    )}
    value={valueHelper(value)}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsContent, TabsList, TabsTrigger };

