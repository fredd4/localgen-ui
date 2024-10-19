import { clsx, type ClassValue } from "clsx";
import { PrimitiveAtom, atom } from "jotai";
import { twMerge } from "tailwind-merge";

/**
 * Provides a utility function to construct className strings conditionally.
 *
 * It leverages clsx and tailwind-merge for flexibility and consistency.
 * clsx handles conditional class inclusion, and tailwind-merge merges Tailwind classes effectively.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Creates a derived atom that accesses and updates a specific field within an object-like atom.
 *
 * This is useful for creating individual atoms for properties of a larger object stored in a base atom.
 * It allows you to work with specific fields directly without needing to update the entire object.
 *
 * @param baseAtom The base atom holding the object-like state.
 * @param field The key of the field you want to derive an atom for.
 * @returns A new atom that represents the specified field within the base atom.
 */
export function createFieldAtom<T extends object, K extends keyof T>(
  baseAtom: PrimitiveAtom<T>,
  field: K
) {
  return atom(
    // Getter: Reads the value of the specified field from the base atom.
    (get) => get(baseAtom)[field],
    (get, set, newValue: T[K]) => {
      const currentObject = get(baseAtom);
      // Setter: Updates the base atom by creating a new object with the field updated.
      set(baseAtom, { ...currentObject, [field]: newValue });
    }
  );
}

/**
 * Generates a formatted date string in the format "YYYY-MMM-DD HH:MM".
 *
 * This function creates a date string suitable for displaying timestamps or logging purposes.
 * It uses the current date and time and formats it with year, abbreviated month, day, hours, and minutes.
 *
 * @returns The formatted date string.
 */
export function getFormattedDate(date: Date): string {
  const year = date.getFullYear();
  const month = date.toLocaleString("default", { month: "short" });
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${year}-${month}-${day} ${hours}:${minutes}`;
}

/**
 * Downloads an image represented as a base64-encoded data URL.
 *
 * This function takes the base64 data of an image, decodes it, and triggers a download
 * with the specified filename. It creates a temporary link element and uses it to initiate
 * the download process.
 *
 * @param base64Data The base64-encoded data URL of the image.
 * @param filename The desired filename for the downloaded image.
 */
export function downloadBase64Image(base64Data: string, filename: string) {
  try {
    // Check if the input is empty
    if (!base64Data) {
      throw new Error("Input base64Data is empty");
    }

    // Strip out the data URL part (if present)
    const [header, base64WithoutHeader] = base64Data.split(",");
    if (!base64WithoutHeader) {
      throw new Error("Invalid base64 format");
    }

    // Determine the image type from the header
    const imageType = header.match(/data:(.*);base64/)?.[1] || "image/png";

    // Convert the base64 string to a binary buffer
    const byteCharacters = atob(base64WithoutHeader);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);

    // Create a Blob from the byte array
    const blob = new Blob([byteArray], { type: imageType });

    // Verify the blob using FileReader
    const reader = new FileReader();
    reader.onload = function(e) {
      if (e.target?.result) {
        // If FileReader succeeds, proceed with download
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        console.log("Image download initiated successfully");
      } else {
        throw new Error("FileReader failed to read the blob");
      }
    };
    reader.onerror = function() {
      throw new Error("FileReader encountered an error");
    };
    reader.readAsDataURL(blob);
  } catch (error) {
    console.error("Error in downloadBase64Image:", error);
    throw error;
  }
}

/**
 * Converts a prompt into a valid filename by:
 * - Trimming it to a maximum length
 * - Replacing invalid filename characters with underscores
 *
 * @param {string} prompt - The input prompt to be converted to a valid filename.
 * @param {number} [maxLength=255] - Optional maximum length for the filename (default is 255 characters).
 * @returns {string} A sanitized, valid filename based on the prompt.
 */
export function promptToFilename(prompt: string, maxLength: number = 128): string {
  // Replace all invalid filename characters with underscores
  const sanitized = prompt.replace(/[^a-zA-Z0-9-_]/g, '-');

  // Ensure the filename does not exceed the maximum length
  const trimmed = sanitized.substring(0, maxLength);

  return trimmed;
}
