import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Allow merging of tailwind classes with complex class names
 *
 * @see https://www.youtube.com/watch?v=re2JFITR7TI - to learn more/why
 */
export function cn(...args: ClassValue[]) {
  return twMerge(clsx(...args));
}
