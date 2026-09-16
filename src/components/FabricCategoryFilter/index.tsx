'use client'
import React, { useCallback, useMemo } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { cn } from '@/utilities/cn'

type Category = {
  id: string | number
  title: string
}

type Props = {
  categories: Category[]
}

export function CategoryFilterBar({ categories }: Props) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const activeId = searchParams.get('category')

  const setCategory = useCallback(
    (id: string | null) => {
      const params = new URLSearchParams(searchParams.toString())
      if (!id || activeId === id) {
        params.delete('category')
      } else {
        params.set('category', id)
      }
      router.push(pathname + (params.toString() ? '?' + params.toString() : ''))
    },
    [activeId, pathname, router, searchParams],
  )

  return (
    <div className="flex flex-wrap justify-center gap-2">
      {/* "Todos" pill */}
      <button
        onClick={() => setCategory(null)}
        className={cn(
          'rounded-full border px-4 py-1.5 text-sm font-medium transition-colors cursor-pointer',
          !activeId
            ? 'bg-primary text-white border-primary'
            : 'border-neutral-300 dark:border-neutral-700 text-neutral-600 dark:text-neutral-300 hover:border-primary hover:text-primary',
        )}
      >
        Todos
      </button>

      {categories.map((cat) => {
        const isActive = activeId === String(cat.id)
        return (
          <button
            key={cat.id}
            onClick={() => setCategory(String(cat.id))}
            className={cn(
              'rounded-full border px-4 py-1.5 text-sm font-medium transition-colors cursor-pointer',
              isActive
                ? 'bg-primary text-white border-primary'
                : 'border-neutral-300 dark:border-neutral-700 text-neutral-600 dark:text-neutral-300 hover:border-primary hover:text-primary',
            )}
          >
            {cat.title}
          </button>
        )
      })}
    </div>
  )
}
