import { useState, useEffect } from "react";
import { Toast, ToastTitle, ToastDescription } from "./ui/toast";
import { AlertTriangleIcon } from "lucide-react";
import { atom, useAtom } from "jotai";

// Create an atom for storing API error messages
export const apiErrorAtom = atom<string | null>(null);

export default function ErrorNotification() {
  const [apiError, setApiError] = useAtom(apiErrorAtom);
  const [visible, setVisible] = useState(false);

  // Show toast when an error is set
  useEffect(() => {
    if (apiError) {
      setVisible(true);
    }
  }, [apiError]);

  // Handle toast close
  const handleClose = () => {
    setApiError(null);
  };

  return (
    <Toast 
      variant="destructive"
      visible={visible}
      onClose={handleClose}
      className="min-w-[400px]"
    >
      <div className="flex items-start">
        <AlertTriangleIcon className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
        <div>
          <ToastTitle>OpenAI API Error</ToastTitle>
          <ToastDescription>
            {apiError}
          </ToastDescription>
        </div>
      </div>
    </Toast>
  );
} 