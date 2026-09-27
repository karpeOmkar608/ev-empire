import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: {
    default: 'EV Empire | Electric Scooters for a Cleaner Tomorrow',
    template: '%s | EV Empire',
  },
  description:
    'Explore EV Empire electric scooters designed for smart, practical and cleaner everyday mobility. Browse Empire Prime, Duo, Family and Classic ranges.',
  keywords: [
    'electric scooter India',
    'EV scooter',
    'EV Empire',
    'electric two wheeler',
    'Empire Prime',
    'Empire Duo',
    'Empire Family',
    'Empire Classic',
    'eco friendly scooter',
    'electric mobility India',
  ],
  authors: [{ name: 'EV Empire' }],
  creator: 'EV Empire',
  publisher: 'EV Empire',
  metadataBase: new URL('https://evempire.in'),
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://evempire.in',
    siteName: 'EV Empire',
    title: 'EV Empire | Electric Scooters for a Cleaner Tomorrow',
    description:
      'Explore EV Empire electric scooters designed for smart, practical and cleaner everyday mobility.',
    images: [
      {
        url: '/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'EV Empire — Drive a Cleaner Tomorrow',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EV Empire | Electric Scooters for a Cleaner Tomorrow',
    description:
      'Explore EV Empire electric scooters designed for smart, practical and cleaner everyday mobility.',
    images: ['/images/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="canonical" href="https://evempire.in" />
      </head>
      <body className="bg-[#070d1a] text-white antialiased">
        {children}
      </body>
    </html>
  )
}
