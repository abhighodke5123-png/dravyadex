import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatRasa(rasa: string): string {
  return rasa.charAt(0).toUpperCase() + rasa.slice(1).toLowerCase();
}
