'use client'
import * as Select from '@radix-ui/react-select'
import { useState } from 'react'

export function Header() {
  const [sort, setSort] = useState('popular')

  return (
    <header className="flex justify-between items-center py-8">
      <h1 className="text-4xl">
        Your <strong className="text-accent-yellow">Feed</strong>
      </h1>
      <label
        className="bg-secondary-gray border-0 rounded-md flex items-center p-4 gap-2"
        htmlFor="search"
      >
        <input
          type="text"
          className="bg-transparent outline-none text-base w-60"
        />
        <i className="ph ph-magnifying-glass text-xl text-accent-yellow"></i>
      </label>
      <div className="bg-secondary-gray p-2 rounded-md flex gap-2">
        <span className="text-secondary-text">Sort by:</span>
        <Select.Root value={sort} onValueChange={setSort}>
          <Select.Trigger className="flex gap-2 items-center justify-center font-bold outline-none">
            <Select.Value />
            <Select.Icon className="SelectIcon">
              <i className="ph ph-caret-down text-xl block"></i>
            </Select.Icon>
          </Select.Trigger>
          <Select.Portal>
            <Select.Content
              position="popper"
              sideOffset={16}
              alignOffset={-8}
              className="bg-secondary-gray font-bold rounded-md"
            >
              <Select.ScrollUpButton className="SelectScrollButton">
                <i className="ph ph-caret-up text-xl block"></i>
              </Select.ScrollUpButton>
              <Select.Viewport className="p-2 flex flex-col gap-2">
                <Select.Item
                  className="hover:outline-none cursor-pointer"
                  value="popular"
                >
                  <Select.ItemText>Most popular</Select.ItemText>
                </Select.Item>
                <Select.Item
                  className="hover:outline-none cursor-pointer"
                  value="recent"
                >
                  <Select.ItemText>Most recent</Select.ItemText>
                </Select.Item>
              </Select.Viewport>
              <Select.ScrollDownButton className="SelectScrollButton">
                <i className="ph ph-caret-down"></i>
              </Select.ScrollDownButton>
            </Select.Content>
          </Select.Portal>
        </Select.Root>
      </div>
    </header>
  )
}
