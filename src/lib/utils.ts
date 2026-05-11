import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(price);
}

export function calculateDays(start: Date, end: Date) {
  const diff = new Date(end).getTime() - new Date(start).getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}
