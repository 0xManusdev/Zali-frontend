import type { Metadata } from 'next'
import { Inter, Space_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({ 
  subsets: ["latin"],
  weight: ['300', '400', '500', '600', '700']
});
const spaceMono = Space_Mono({ 
  subsets: ["latin"],
  weight: ['400', '700']
});

export const metadata: Metadata = {
  title: 'Zali - AI Crop Monitoring & Intelligent Irrigation',
  description: 'Advanced AI-powered plant disease detection and irrigation recommendations for farmers',
  generator: 'v0.app',
  applicationName: 'Zali',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
