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
