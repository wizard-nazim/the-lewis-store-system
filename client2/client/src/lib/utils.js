// src/lib/utils.js
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combine Tailwind classes safely, merging duplicates.
 * @param  {...any} inputs - class names or objects
 * @returns {string} - merged class string
 */
export function cn(...inputs) {
  return twMerge(clsx(...inputs));
}
