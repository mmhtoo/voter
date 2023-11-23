import type { Metadata } from 'next'
import './globals.css'
import { Inter as FontSans } from 'next/font/google'
import { cn } from '@/libs/utils'
import ThemeProvider from '@/components/provider/theme-provider'
import AppFooter from '@/components/app-footer'
import { Toaster } from '@/components/ui/toaster'
import { ClerkProvider } from '@clerk/nextjs'
import PublicHeader from '@/components/public-header'

export const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
})

export const metadata: Metadata = {
  title: '%s | Voter',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={cn(
            'min-h-screen dark:bg-black bg-background font-sans antialiased',
            fontSans.variable
          )}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange>
            <>
              <PublicHeader />
              {children}
              <AppFooter />
              <Toaster />
            </>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
