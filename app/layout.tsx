import type { Metadata } from 'next'
import { Inter, DM_Serif_Display } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' })
const dmSerif = DM_Serif_Display({ subsets: ['latin'], weight: '400', style: ['normal', 'italic'], variable: '--font-dm-serif', display: 'swap' })

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
    <html lang="en" className={`${inter.variable} ${dmSerif.variable}`}>
      <body>{children}</body>
    </html>
  )
}
