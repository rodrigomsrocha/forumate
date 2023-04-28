import { ReactNode } from 'react'
import { Sidebar } from '~/components/Sidebar'
import './globals.css'

import '@phosphor-icons/web/regular'

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
        {children}
      </body>
    </html>
  )
}
