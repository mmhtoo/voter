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
  return new Date(date.getTime() + 1000 * 60 * -new Date().getTimezoneOffset())
    .toISOString()
    .replace('T', ' ')
    .replace('Z', '')
}

export function today() {
  return new Date(Date.now() + 1000 * 60 * -new Date().getTimezoneOffset())
    .toISOString()
    .replace('T', ' ')
    .replace('Z', '')
}

export function formatAccountSpacing(account: string) {
  return account.toString().replace(/\d{4}(?=.)/g, '$& ')
}
