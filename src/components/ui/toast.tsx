import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

const toastVariants = cva(
  "fixed right-4 top-4 z-50 max-w-md rounded-md border shadow-lg transition-all data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground",
        destructive:
          "bg-destructive text-destructive-foreground border-destructive",
        success:
          "bg-green-600 text-white border-green-500",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface ToastProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof toastVariants> {
  visible: boolean;
  onClose?: () => void;
}

export function Toast({
  className,
  variant,
  visible,
  onClose,
  children,
  ...props
}: ToastProps) {
  const [isVisible, setIsVisible] = React.useState(visible);

  // Update internal state when visible prop changes
  React.useEffect(() => {
    setIsVisible(visible);
  }, [visible]);

  // Close animation handler
  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose && onClose();
    }, 300); // Animation duration
  };

  if (!isVisible) return null;

  return (
    <div
      className={cn(toastVariants({ variant }), className)}
      role="alert"
      data-state={isVisible ? "open" : "closed"}
      {...props}
    >
      <div className="flex items-start p-4 gap-3">
        <div className="flex-1">{children}</div>
        <button
          onClick={handleClose}
          className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full opacity-70 ring-offset-background transition-opacity hover:opacity-100"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </button>
      </div>
    </div>
  );
}

export const ToastTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn("mb-1 font-medium text-sm leading-none tracking-tight", className)}
    {...props}
  />
));
ToastTitle.displayName = "ToastTitle";

export const ToastDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm [&_p]:leading-relaxed", className)}
    {...props}
  />
));
ToastDescription.displayName = "ToastDescription"; 