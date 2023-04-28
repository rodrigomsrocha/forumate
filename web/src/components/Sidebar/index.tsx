'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="fixed top-0 bottom-0 left-0 w-20 bg-secondary-gray flex flex-col justify-between items-center py-8">
      <Image src="/logo.svg" alt="F" width={20} height={20} />
      <div className="flex flex-col gap-8">
        <Link className={pathname === '/' ? 'text-accent-yellow' : ''} href="/">
          <i className="ph ph-house text-2xl"></i>
        </Link>
        <Link
          className={pathname === '/user' ? 'text-accent-yellow' : ''}
          href="/user"
        >
          <i className="ph ph-user text-2xl"></i>
        </Link>
        <button>
          <i className="ph ph-notification text-2xl"></i>
        </button>
      </div>
      <button>
        <i className="ph ph-sign-out text-2xl"></i>
      </button>
    </aside>
  )
}
