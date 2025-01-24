import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getLocalStorage(key: string) {
  if (typeof window !== "undefined") {
    const cacheData = localStorage.getItem(key);
    if (cacheData) {
      const returnData = JSON.parse(cacheData);
      return returnData;
    } else {
      return null;
    }
  }
}

export function setLocalStorage(key: string, value: any) {
  if (typeof window !== "undefined") {
    localStorage.setItem(key, JSON.stringify(value));
  }
}
