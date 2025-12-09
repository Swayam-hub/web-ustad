import React from 'react'
import Button from './Button'

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-neutral-900 bg-black/80 backdrop-blur-md">
        <nav className="flex items-center justify-between px-6 py-6 max-w-7xl mx-auto">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 bg-linear-to-br from-white to-neutral-400 rounded-lg" />
            <span className="font-bold text-lg tracking-tight">
              Web <span className="text-neutral-500">Ustad</span>
            </span>{" "}
            {/* Updated Logo */}
          </div>
          {/* Navigation Links (excluding Book Demo) - still hidden on mobile */}
          <div className="hidden md:flex gap-1">
            <Button variant="ghost" size="sm">
              Product
            </Button>
            <Button variant="ghost" size="sm">
              Solutions
            </Button>
            <Button variant="ghost" size="sm">
              Pricing
            </Button>
            {/* REMOVED: Book Demo was here */}
          </div>
          {/* Action buttons on the right */}
          <div className="flex gap-3">
            <Button variant="ghost">Log in</Button>
            {/* FIX: Removed 'hidden sm:inline-flex' to ensure visibility on all screen sizes */}
            <Button variant="outline" size="sm">
              Book Demo
            </Button>
            <Button variant="default" size="sm">
              Start Building
            </Button>
          </div>
        </nav>
      </header>
  )
}

export default Header
