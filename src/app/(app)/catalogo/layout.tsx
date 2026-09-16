import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React, { Suspense } from 'react'
import { CategoryFilterBar } from '@/components/FabricCategoryFilter'

async function CategoryFilterServer() {
  const payload = await getPayload({ config: configPromise })
  const { docs: categories } = await payload.find({
    collection: 'categories',
    sort: 'title',
    limit: 50,
  })

  const simplified = categories.map((c) => ({ id: c.id, title: c.title }))

  return (
    <Suspense fallback={<div className="h-10" />}>
      <CategoryFilterBar categories={simplified} />
    </Suspense>
  )
}

export default function CatalogoLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container flex flex-col gap-10 py-12 pb-20">
      {/* Page title */}
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
          Catálogo de Telas
        </h1>
        <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
          Selecciona una categoría para filtrar
        </p>
      </div>

      {/* Category filter pills — centered, full width */}
      <Suspense fallback={<div className="h-10" />}>
        <CategoryFilterServer />
      </Suspense>

      {/* Grid content */}
      <div>{children}</div>
    </div>
  )
}
