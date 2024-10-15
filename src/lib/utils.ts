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
