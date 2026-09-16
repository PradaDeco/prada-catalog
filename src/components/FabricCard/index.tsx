import Link from 'next/link'
import Image from 'next/image'
import React from 'react'
import { Price } from '@/components/Price'

type Category = {
  id: string | number
  title: string
  slug?: string
}

type MediaDoc = {
  url?: string
  filename?: string
  alt?: string
  width?: number
  height?: number
}

type GalleryItem = {
  image?: MediaDoc | string
}

type Fabric = {
  id: string | number
  slug: string
  title: string
  priceInUSD?: number | null
  image?: MediaDoc | string | null
  gallery?: GalleryItem[]
  categories?: (Category | string)[]
  composition?: string
  sku?: string
}

type Props = {
  fabric: Fabric
}

function getImageUrl(resource: MediaDoc | string | null | undefined): string | null {
  if (!resource || typeof resource === 'string') return null
  if (resource.url) return resource.url
  if (resource.filename) return `/api/media/file/${resource.filename}`
  return null
}

export const FabricCard: React.FC<Props> = ({ fabric }) => {
  const { title, priceInUSD, slug, image, gallery, categories } = fabric

  // Prefer top-level image, fall back to first gallery image
  const primaryImage: MediaDoc | string | null | undefined =
    image ?? (gallery?.[0]?.image ?? null)

  const imageUrl = getImageUrl(
    typeof primaryImage === 'string' ? null : (primaryImage as MediaDoc | null),
  )

  const imageAlt =
    typeof primaryImage === 'string'
      ? title
      : (primaryImage as MediaDoc | null)?.alt || title

  const resolvedCategories = (categories ?? []).filter(
    (c): c is Category => typeof c === 'object' && c !== null,
  )

  return (
    <Link
      href={`/fabrics/${slug}`}
      className="group flex flex-col bg-white dark:bg-neutral-900 rounded-2xl overflow-hidden border border-neutral-100 dark:border-neutral-800 shadow-sm hover:shadow-md transition-shadow duration-300"
    >
      {/* Image area */}
      <div className="relative aspect-[4/3] w-full bg-neutral-50 dark:bg-neutral-800 overflow-hidden">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={imageAlt}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
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
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
        )}
      </div>

      {/* Content area */}
      <div className="flex flex-col gap-2 p-4">
        {/* Category badges */}
        {resolvedCategories.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {resolvedCategories.map((cat) => (
              <span
                key={cat.id}
                className="inline-block rounded-full bg-primary/10 px-2.5 py-0.5 text-[11px] font-medium text-primary"
              >
                {cat.title}
              </span>
            ))}
          </div>
        )}

        {/* Name + Price */}
        <div className="flex items-start justify-between gap-2 mt-1">
          <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 text-sm leading-snug group-hover:text-primary transition-colors line-clamp-2">
            {title}
          </h3>
          {typeof priceInUSD === 'number' && priceInUSD > 0 && (
            <span className="flex-shrink-0 text-sm font-bold text-primary">
              <Price amount={priceInUSD} as="span" />
            </span>
          )}
        </div>
      </div>
    </Link>
  )
}
