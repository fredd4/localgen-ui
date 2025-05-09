import * as React from "react";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { Button } from "./button";

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}

const DialogOverlay = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-black/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
  />
));
DialogOverlay.displayName = "DialogOverlay";

const DialogContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { onDismiss?: () => void }
>(({ className, children, onDismiss, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "fixed left-1/2 top-1/2 z-50 h-auto max-h-[90vh] w-[90vw] max-w-[90vw] -translate-x-1/2 -translate-y-1/2 focus:outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 overflow-hidden",
      className
    )}
    {...props}
  >
    {children}
    <div className="absolute right-4 top-4 z-[60]">
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 rounded-full bg-background/90 text-foreground shadow-md hover:bg-background"
        onClick={onDismiss}
      >
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </Button>
    </div>
  </div>
));
DialogContent.displayName = "DialogContent";

export function Dialog({ isOpen, onClose, children, className }: DialogProps) {
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  React.useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isMounted || !isOpen) return null;

  return (
    <React.Fragment>
      <DialogOverlay onClick={onClose} />
      <DialogContent className={className} onDismiss={onClose}>
        {children}
      </DialogContent>
    </React.Fragment>
  );
} 