import type { Fabric, CarouselBlock as CarouselBlockProps } from '@/payload-types'

import configPromise from '@payload-config'
import { DefaultDocumentIDType, getPayload } from 'payload'
import React from 'react'

import { CarouselClient } from './Component.client'

export const CarouselBlock: React.FC<
  CarouselBlockProps & {
    id?: DefaultDocumentIDType
  }
> = async (props) => {
  const { id, categories, limit = 3, populateBy, selectedDocs } = props

  let products: Fabric[] = []

  if (populateBy === 'collection') {
    const payload = await getPayload({ config: configPromise })

    const flattenedCategories = categories?.length
      ? categories.map((category) => {
          if (typeof category === 'object') return category.id
          else return category
        })
      : null

    const fetchedProducts = await payload.find({
      collection: 'fabrics' as any,
      depth: 1,
      limit: limit || undefined,
      ...(flattenedCategories && flattenedCategories.length > 0
        ? {
            where: {
              categories: {
                in: flattenedCategories,
              },
            },
          }
        : {}),
    })

    products = fetchedProducts.docs as any
  } else if (selectedDocs?.length) {
    products = selectedDocs.map((post: any) => {
      if (typeof post.value !== 'string') return post.value
    }) as any
  }

  if (!products?.length) return null

  return (
    <div className=" w-full pb-6 pt-1">
      <CarouselClient products={products} />
    </div>
  )
}
