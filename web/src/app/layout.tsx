import { ReactNode } from 'react'
import { Sidebar } from '~/components/Sidebar'
import './globals.css'

import '@phosphor-icons/web/regular'
import { Header } from '~/components/Header'

export const metadata = {
  title: {
    default: 'Forumate',
    template: '%s | Forumate',
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
  icons: {
    icon: '/logo.svg',
  },
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-primary-gray text-primary-text pl-20">
        <Sidebar />
        <div className="max-w-7xl mx-auto">
          <Header />
          {children}
        </div>
      </body>
    </html>
  )
}
