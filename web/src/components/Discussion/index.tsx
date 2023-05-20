import Image from 'next/image'
import { DiscussionType } from '~/@types/app'

interface DiscussionProps {
  discussion: DiscussionType
}

export function Discussion({ discussion }: DiscussionProps) {
  return (
    <div className="flex bg-secondary-gray p-4 sm:p-6 gap-4 rounded-md">
      <aside className="flex flex-col items-center">
        <button className="p-2 group">
          <i className="ph ph-arrow-up transition-colors group-hover:text-accent-yellow text-base sm:text-xl"></i>
        </button>
        <span>123</span>
        <button className="p-2 group">
          <i className="ph ph-arrow-down transition-colors group-hover:text-accent-purple text-base sm:text-xl"></i>
        </button>
      </aside>
      <div className="flex flex-col gap-4 flex-1">
        <header className="flex flex-col sm:flex-row gap-2 sm:gap-4 items-start sm:items-center">
          <h1 className="text-lg sm:text-2xl font-bold line-clamp-1">
            {discussion.title}
          </h1>
          <span className="bg-accent-yellow text-primary-gray px-2 py-1 rounded-md text-xs sm:text-sm">
            question
          </span>
        </header>
        <main className="text-secondary-text flex flex-col gap-2">
          <div dangerouslySetInnerHTML={{ __html: discussion.content }}></div>
        </main>
        <div className="w-full h-px bg-secondary-text"></div>
        <footer className="flex items-center justify-between">
          <div className="flex gap-2 items-center">
            <div className="hidden sm:block rounded-md overflow-hidden">
              <Image
                src="https://randomuser.me/api/portraits/men/1.jpg"
                width={40}
                height={40}
                alt="user picture"
              />
            </div>
            <div>
              <strong className="text-accent-yellow block text-sm sm:text-base">
                John Doe
              </strong>
              <time className="text-secondary-text text-xs sm:text-sm">
                2h ago
              </time>
            </div>
          </div>
          <button className="rounded-md transition-colors hover:bg-primary-gray p-2">
            <i className="ph ph-chat-centered text-base sm:text-xl block"></i>
          </button>
        </footer>
      </div>
    </div>
  )
}
