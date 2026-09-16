'use client'

import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { MenuIcon } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { cn } from '@/utilities/cn'

interface NavLink {
  label: string
  href: string
}

interface Props {
  navLinks: NavLink[]
}

export function MobileMenu({ navLinks }: Props) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) setIsOpen(false)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    setIsOpen(false)
  }, [pathname, searchParams])

  return (
    <Sheet onOpenChange={setIsOpen} open={isOpen}>
      <SheetTrigger className="relative flex h-10 w-10 items-center justify-center rounded-md border border-neutral-200 text-neutral-700 transition-colors dark:border-neutral-700 dark:text-white">
        <MenuIcon className="h-4 w-4" />
      </SheetTrigger>

      <SheetContent side="left" className="px-4">
        <SheetHeader className="px-0 pt-4 pb-0">
          <SheetTitle>
            <Link href="/" onClick={() => setIsOpen(false)}>
              <Image
                src="/logo-prada.png"
                alt="Prada Design Logo"
                width={120}
                height={40}
                className="h-10 w-auto object-contain"
              />
            </Link>
          </SheetTitle>
          <SheetDescription />
        </SheetHeader>

        <div className="py-6">
          <ul className="flex w-full flex-col gap-1">
            {navLinks.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    'block py-2 px-2 rounded-md text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:text-primary hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors',
                    { 'text-primary font-semibold': pathname.startsWith(item.href) },
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>


        </div>
      </SheetContent>
    </Sheet>
  )
}
