import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X, Search, ShoppingCart, User, ChevronDown } from 'lucide-react'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between lg:grid lg:grid-cols-[auto_1fr_auto] lg:gap-4">
          {/* Left: Mobile menu button & Logo */}
          <div className="flex items-center gap-3">
            <button
              aria-label="Open Menu"
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-300 lg:hidden"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>

            {/* Logo */}
            <Link to="/" className="font-black tracking-tight text-xl select-none hover:opacity-90 transition-opacity">
              <span className="font-heading">SHOP.CO</span>
            </Link>
            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-6 text-sm ml-6 whitespace-nowrap">
              <button className="inline-flex items-center gap-1 text-gray-800 hover:text-black transition-colors">Shop
                <ChevronDown className="h-4 w-4 opacity-70" />
              </button>
              <Link to="#" className="text-gray-800 hover:text-black transition-colors">On Sale</Link>
              <Link to="#" className="text-gray-800 hover:text-black transition-colors">New Arrivals</Link>
              <Link to="#" className="text-gray-800 hover:text-black transition-colors">Brands</Link>
            </nav>
          </div>

          {/* Center: Search (desktop only) */}
          <div className="hidden lg:block justify-self-center w-full max-w-[400px]">
            <div className="relative">
              <span className="absolute inset-y-0 left-3 flex items-center text-gray-500">
                <Search className="h-4 w-4" />
              </span>
              <input
                type="text"
                placeholder="Search for products..."
                className="w-full rounded-full bg-gray-100 pl-9 pr-4 py-2.5 text-sm outline-none ring-1 ring-transparent focus:ring-gray-300 placeholder:text-gray-500 transition-shadow duration-200 focus:shadow-sm"
              />
            </div>
          </div>

          {/* Right: Icons */}
          <div className="flex items-center gap-4 justify-self-end">
            {/* Search icon on mobile */}
            <button aria-label="Search" className="lg:hidden text-gray-800 hover:text-black transition-colors">
              <Search className="h-5 w-5" />
            </button>
            <button aria-label="Cart" className="text-gray-800 hover:text-black transition-colors">
              <ShoppingCart className="h-5 w-5" />
            </button>
            <button aria-label="Account" className="text-gray-800 hover:text-black transition-colors">
              <User className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile dropdown overlay */}
      <div
        id="mobile-menu"
        className={`lg:hidden fixed inset-x-0 top-16 z-50 border-b bg-white/95 supports-[backdrop-filter]:bg-white/90 backdrop-blur shadow-sm transition-all duration-300 ease-out overflow-hidden ${
          isOpen ? 'max-h-[70vh] opacity-100 translate-y-0' : 'max-h-0 opacity-0 -translate-y-2'
        }`}
      >
        <div className="mx-auto max-w-7xl px-6 py-4 space-y-2">
          <Link to="#" className="block py-2 text-sm text-gray-800 hover:text-black transition-colors">Shop</Link>
          <Link to="#" className="block py-2 text-sm text-gray-800 hover:text-black transition-colors">On Sale</Link>
          <Link to="#" className="block py-2 text-sm text-gray-800 hover:text-black transition-colors">New Arrivals</Link>
          <Link to="#" className="block py-2 text-sm text-gray-800 hover:text-black transition-colors">Brands</Link>
          <div className="pt-2">
            <div className="relative">
              <span className="absolute inset-y-0 left-3 flex items-center text-gray-500">
                <Search className="h-4 w-4" />
              </span>
              <input
                type="text"
                placeholder="Search for products..."
                className="w-full rounded-full bg-gray-100 pl-9 pr-4 py-2.5 text-sm outline-none ring-1 ring-transparent focus:ring-gray-300 placeholder:text-gray-500 transition-shadow duration-200 focus:shadow-sm"
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
