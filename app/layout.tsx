import type { Metadata } from 'next'
import { Inter, Cormorant_Garamond } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['300', '400'],
})

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-cormorant',
  display: 'swap',
  weight: ['300'],
  style: ['normal', 'italic'],
})

export const metadata: Metadata = {
  title: 'REGEN COHORT 01 — Private Longevity Program',
  description: 'An 8-person private longevity program tracking MSC lysate protocols and longitudinal biomarker data. By application only.',
  openGraph: {
    title: 'REGEN COHORT 01',
    description: 'Private longitudinal wellness program. 8 participants. Biomarker-tracked.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${cormorant.variable}`}>
      <body>{children}</body>
    </html>
  )
}
