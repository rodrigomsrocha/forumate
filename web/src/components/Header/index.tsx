export function Header() {
  return (
    <header className="flex justify-between items-center py-8">
      <h1 className="hidden text-3xl xl:block">
        Your <strong className="text-accent-yellow">Feed</strong>
      </h1>
      <label
        className="bg-secondary-gray border-0 rounded-md flex items-center px-4 py-2 gap-4"
        htmlFor="search"
      >
        <input
          type="text"
          placeholder="Discussion..."
          className="bg-transparent outline-none text-base w-28 sm:w-50"
        />
        <button className="flex" type="button">
          <i className="ph ph-magnifying-glass text-xl text-accent-yellow"></i>
        </button>
      </label>
      <button
        type="button"
        className="flex items-center gap-2 bg-accent-yellow p-2 sm:px-4 sm:py-2 rounded-md text-primary-gray transition-opacity hover:opacity-80"
      >
        <i className="ph ph-plus text-xl"></i>
        <span className="hidden sm:block">New discussion</span>
      </button>
    </header>
  )
}
