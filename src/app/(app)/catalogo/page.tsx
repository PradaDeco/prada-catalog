import { FabricCard } from '@/components/FabricCard'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'

export const metadata = {
  description: 'Catálogo de telas y productos Prada Design.',
  title: 'Catálogo | Prada Design',
}

type SearchParams = { [key: string]: string | string[] | undefined }

type Props = {
  searchParams: Promise<SearchParams>
}

export default async function CatalogoPage({ searchParams }: Props) {
  const { q: searchValue, sort, category } = await searchParams
  const payload = await getPayload({ config: configPromise })

  const fabrics = await payload.find({
    collection: 'fabrics' as any,
    draft: false,
    overrideAccess: false,
    depth: 2,
    select: {
      title: true,
      slug: true,
      image: true,
      gallery: true,
      categories: true,
      priceInUSD: true,
      sku: true,
      composition: true,
    } as any,
    ...(sort ? { sort } : { sort: 'title' }),
    where: {
      and: [
        {
          _status: {
            equals: 'published',
          },
        },
        ...(searchValue
          ? [
              {
                or: [
                  { title: { like: searchValue } },
                  { description: { like: searchValue } },
                ],
              },
            ]
          : []),
        ...(category
          ? [
              {
                categories: {
                  contains: category,
                },
              },
            ]
          : []),
      ],
    },
  })

  const resultsText = fabrics.docs.length === 1 ? 'resultado' : 'resultados'

  return (
    <div>
      {searchValue ? (
        <p className="mb-6 text-sm text-neutral-500">
          {fabrics.docs.length === 0
            ? 'No se encontraron telas que coincidan con '
            : `Mostrando ${fabrics.docs.length} ${resultsText} para `}
          <span className="font-semibold text-neutral-900 dark:text-neutral-100">
            &quot;{searchValue}&quot;
          </span>
        </p>
      ) : null}

      {!searchValue && fabrics.docs.length === 0 && (
        <div className="flex flex-col items-center justify-center py-24 text-center gap-4">
          <svg
            className="h-16 w-16 text-neutral-200 dark:text-neutral-700"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p className="text-neutral-500 dark:text-neutral-400">
            No se encontraron telas en esta categoría.
          </p>
        </div>
      )}

      {fabrics.docs.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {fabrics.docs.map((fabric: any) => (
            <FabricCard key={fabric.id} fabric={fabric} />
          ))}
        </div>
      )}
    </div>
  )
}
