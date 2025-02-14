import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function copyToClipboard(text: string) {
  return new Promise((resolve, reject) => {
    try {
      navigator.clipboard.writeText(text);
      resolve(true);
    } catch (error) {
      reject(error);
    }
  });
}
