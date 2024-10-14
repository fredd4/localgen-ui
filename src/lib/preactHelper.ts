import { SignalLike } from "@/types/preactHelper";

export const valueHelper = (value: string | number | string[] | SignalLike<string | number | string[] | undefined> | undefined) => {
  if (!value)
    return "";
  if (typeof value === "string")
    return value;
  if (Array.isArray(value))
    return value.join(" ");
  if (typeof value === "number")
    return value.toString();
  if ("peek" in value)
    return value.peek("") as string;
  console.error("Unknown value type", value)
  return "";
}