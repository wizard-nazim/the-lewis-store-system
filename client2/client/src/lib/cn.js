// src/lib/cn.js
//combining Tailwind CSS classes dynamically in a clean, conflict-free way.
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}