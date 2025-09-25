import { Providers } from '@/components/shared/Providers'
import { ReactChildren } from '@/types/global.type'
import '@fontsource/poppins'
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Bank Transactions',
  description: 'Bank Transactions',
  applicationName: 'Bank App',
  icons: '/icon-192x192.png',
  manifest: '/manifest.json',
}

export default function RootLayout({ children }: Readonly<ReactChildren>) {
  return (
    <html lang="es">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
