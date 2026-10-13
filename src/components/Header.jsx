import Link from 'next/link'
import React from 'react'

function Header() {
  const navLinks = [
    { href: '/', label: 'Bosh sahifa' },
    { href: '/about', label: 'Haqimizda' },
    { href: '/products', label: 'Mahsulotlar' },
    { href: '/contact', label: 'Aloqa' },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4">

        <Link href="/" className="flex items-center gap-2 text-xl font-bold tracking-tight text-slate-900">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white">N</span>
          <span>Next<span className="text-blue-600">Brand</span></span>
        </Link>

        <ul className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="text-sm font-medium text-slate-700 hover:text-blue-600">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="rounded-lg px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100"
          >
            Kirish
          </Link>
          <Link
            href="/contact"
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition"
          >
            Bog'lanish
          </Link>
        </div>
      </div>
    </header>
  )
}

export default Header