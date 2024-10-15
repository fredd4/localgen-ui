import { clsx, type ClassValue } from "clsx";
import { PrimitiveAtom, atom } from 'jotai';
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
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
