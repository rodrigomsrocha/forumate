'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="self-start h-screen lg:w-72 items-center lg:items-start sticky top-0 bottom-0 bg-secondary-gray flex flex-col justify-between px-4 py-8 sm:p-8">
      <div className="flex items-center gap-4">
        <div className="w-4 h-4">
          <Image src="/logo.svg" alt="Forumate logo" width={40} height={40} />
        </div>
        <h1 className="hidden text-xl font-bold lg:block">Forumate</h1>
      </div>
      <div className="flex flex-col gap-8">
        <Link
          className={`flex gap-4 items-center
            ${pathname === '/' ? 'text-accent-yellow font-bold' : ''}
          `}
          href="/"
        >
          <i className="ph ph-house text-xl sm:text-2xl"></i>
          <span className="hidden lg:block">Home</span>
        </Link>
        <button className="flex gap-4 items-center">
          <i className="ph ph-notification text-xl sm:text-2xl"></i>
          <span className="hidden lg:block">Notifications</span>
        </button>
      </div>
      <Link href="/user" className="w-full flex gap-2 items-center text-left group">
        <div className="w-10 h-10 bg-primary-gray rounded-full flex items-center justify-center">
          <i className="ph ph-user text-xl sm:text-2xl"></i>
        </div>
        <p className="text-sm hidden lg:block transition-colors group-hover:text-secondary-text">
          <span className='underline'>Sign up</span> and start a discussion
        </p>
      </Link>
    </aside>
  )
}
