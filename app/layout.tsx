import type { Metadata } from 'next'
import { DM_Serif_Display, Manrope } from 'next/font/google'
import './globals.css'

const dmSerifDisplay = DM_Serif_Display({
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal', 'italic'],
  variable: '--font-display',
  display: 'swap',
})

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-body',
  display: 'swap',
})

export const metadata: Metadata = {
  title: ' Xiomara S. — Fitness Coach · Nutrition · Community',
  description: 'Transform your life with Elena Vasquez. Online coaching, nutrition guidance, and community for women ready to do the work.',
  keywords: 'personal trainer, online coaching, fitness, nutrition, women, wellness',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${dmSerifDisplay.variable} ${manrope.variable}`}>
      <body className="font-sans bg-sakura text-espresso antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  )
}
