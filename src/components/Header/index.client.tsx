'use client'
import Link from 'next/link'
import Image from 'next/image'
import React, { Suspense } from 'react'

import { MobileMenu } from './MobileMenu'
import { usePathname } from 'next/navigation'
import { cn } from '@/utilities/cn'

export function HeaderClient() {
  const pathname = usePathname()

  const navLinks = [
    { label: 'Catálogo', href: '/catalogo' },
    { label: 'Quiénes Somos', href: '/quienes-somos' },
  ]

  return (
    <div className="relative z-20 border-b border-neutral-200 bg-white dark:bg-neutral-950 dark:border-neutral-800">
      <nav className="flex items-center justify-between container py-3">
        {/* Mobile hamburger */}
        <div className="block flex-none md:hidden">
          <Suspense fallback={null}>
            <MobileMenu navLinks={navLinks} />
          </Suspense>
        </div>

        {/* Logo */}
        <Link href="/" className="flex-shrink-0">
          <Image
            src="/logo-prada.png"
            alt="Prada Design Logo"
            width={140}
            height={48}
            className="h-12 w-auto object-contain"
            priority
          />
        </Link>

        {/* Desktop nav */}
        <ul className="hidden gap-8 text-sm font-medium md:flex md:items-center">
          {navLinks.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  'relative navLink text-neutral-700 dark:text-neutral-300 hover:text-primary transition-colors',
                  {
                    active: pathname.startsWith(item.href),
                  },
                )}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Spacer to keep nav centered */}
        <div className="hidden md:block w-[140px]" />
      </nav>
    </div>
  )
}
