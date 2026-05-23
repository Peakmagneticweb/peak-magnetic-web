import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Peak Magnetic',
  description: 'Ibiza Electronic Music Radio',
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-black text-white antialiased">{children}</body>
    </html>
  )
}