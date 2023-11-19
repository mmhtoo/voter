import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function setPageTitle(title: string) {
  if (!document) return
  document.title = title
}

export function formatPsqlDate(date: Date) {
  return date.toISOString().replace('T', ' ').replace('Z', ' ')
}

export function today() {
  return formatPsqlDate(new Date(Date.now()))
}
