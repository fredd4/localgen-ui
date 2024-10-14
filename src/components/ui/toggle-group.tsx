import { toggleVariants } from "@/components/ui/toggle";
import { cn } from "@/lib/utils";
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group";
import { type VariantProps } from "class-variance-authority";
import { createContext, forwardRef, useContext } from "preact/compat";

// Define a context for variant props
const ToggleGroupContext = createContext<VariantProps<typeof toggleVariants>>({
  size: "default",
  variant: "default",
});

// Define the props for ToggleGroup, allowing both 'single' and 'multiple' types
type ToggleGroupProps = (ToggleGroupPrimitive.ToggleGroupSingleProps | ToggleGroupPrimitive.ToggleGroupMultipleProps) & VariantProps<typeof toggleVariants>;


// ForwardRef with appropriate type annotations
const ToggleGroup = forwardRef<HTMLDivElement, ToggleGroupProps>(
  ({ className, variant, size, children, ...props }, ref) => (
    <ToggleGroupPrimitive.Root
      ref={ref}
      className={cn("flex items-center justify-center gap-1", className)}
      {...props}
    >
      <ToggleGroupContext.Provider value={{ variant, size }}>
        {children}
      </ToggleGroupContext.Provider>
    </ToggleGroupPrimitive.Root>
  )
);

ToggleGroup.displayName = ToggleGroupPrimitive.Root.displayName;

// Define the props for ToggleGroupItem
type ToggleGroupItemProps = ToggleGroupPrimitive.ToggleGroupItemProps & VariantProps<typeof toggleVariants>;

// ForwardRef for ToggleGroupItem with appropriate type annotations
const ToggleGroupItem = forwardRef<HTMLButtonElement, ToggleGroupItemProps>(
  ({ className, children, variant, size, ...props }, ref) => {
    const context = useContext(ToggleGroupContext);

    return (
      <ToggleGroupPrimitive.Item
        ref={ref}
        className={cn(
          toggleVariants({
            variant: variant || context.variant,
            size: size || context.size,
          }),
          className
        )}
        {...props}
      >
        {children}
      </ToggleGroupPrimitive.Item>
    );
  }
);

ToggleGroupItem.displayName = ToggleGroupPrimitive.Item.displayName;

export { ToggleGroup, ToggleGroupItem };
