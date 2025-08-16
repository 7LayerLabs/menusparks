import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'MenuSparks - Expert Restaurant Special Creation Service',
  description: 'Transform your weekly special stress into profit-optimized menu additions with expert-created specials delivered weekly.',
  keywords: 'restaurant specials, menu optimization, restaurant consulting, profit improvement',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}