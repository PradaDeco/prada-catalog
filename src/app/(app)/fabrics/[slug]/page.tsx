import type { Media } from '@/payload-types'

import { RenderBlocks } from '@/blocks/RenderBlocks'
import { Gallery } from '@/components/product/Gallery'
import { ProductDescription } from '@/components/product/ProductDescription'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import React, { Suspense } from 'react'
import { Button } from '@/components/ui/button'
import { ChevronLeftIcon } from 'lucide-react'
import { Metadata } from 'next'
import { ProductGridItem } from '@/components/ProductGridItem'

type Args = {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { slug } = await params
  const fabric = await queryFabricBySlug({ slug })

  if (!fabric) return notFound()

  const gallery = fabric.gallery?.filter((item: any) => typeof item.image === 'object') || []
  const metaImage = typeof fabric.meta?.image === 'object' ? fabric.meta?.image : undefined
  const canIndex = fabric._status === 'published'
  const seoImage = metaImage || (gallery.length ? (gallery[0]?.image as Media) : undefined)

  return {
    description: fabric.meta?.description || '',
    openGraph: seoImage?.url
      ? {
          images: [
            {
              alt: seoImage?.alt,
              height: seoImage.height!,
              url: seoImage?.url,
              width: seoImage.width!,
            },
          ],
        }
      : null,
    robots: {
      follow: canIndex,
      googleBot: {
        follow: canIndex,
        index: canIndex,
      },
      index: canIndex,
    },
    title: fabric.meta?.title || fabric.title,
  }
}

export default async function FabricPage({ params }: Args) {
  const { slug } = await params
  const fabric = await queryFabricBySlug({ slug })

  if (!fabric) return notFound()

  const gallery =
    fabric.gallery
      ?.filter((item: any) => typeof item.image === 'object')
      .map((item: any) => ({
        ...item,
        image: item.image as Media,
      })) || []

  const metaImage = typeof fabric.meta?.image === 'object' ? fabric.meta?.image : undefined
  const price = fabric.priceInUSD

  const productJsonLd = {
    name: fabric.title,
    '@context': 'https://schema.org',
    '@type': 'Product',
    description: fabric.description,
    image: metaImage?.url,
    ...(price
      ? {
          offers: {
            '@type': 'Offer',
            price: price,
            priceCurrency: 'usd',
          },
        }
      : {}),
  }

  const relatedFabrics =
    fabric.relatedFabrics?.filter((item: any) => typeof item === 'object') ?? []

  return (
    <React.Fragment>
      <script
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productJsonLd),
        }}
        type="application/ld+json"
      />
      <div className="container pt-8 pb-8">
        <Button asChild variant="ghost" className="mb-4">
          <Link href="/catalogo">
            <ChevronLeftIcon />
            Volver al Catálogo
          </Link>
        </Button>
        <div className="flex flex-col gap-12 rounded-lg border p-8 md:py-12 lg:flex-row lg:gap-8 bg-primary-foreground">
          <div className="h-full w-full basis-full lg:basis-1/2">
            <Suspense
              fallback={
                <div className="relative aspect-square h-full max-h-[550px] w-full overflow-hidden" />
              }
            >
              {Boolean(gallery?.length) && <Gallery gallery={gallery} />}
            </Suspense>
          </div>

          <div className="basis-full lg:basis-1/2">
            <ProductDescription product={fabric} />
          </div>
        </div>
      </div>

      {fabric.layout ? <RenderBlocks blocks={fabric.layout} /> : null}

      {relatedFabrics.length > 0 && (
        <div className="container py-12">
          <h2 className="text-2xl font-bold mb-6">Telas Relacionadas</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedFabrics.map((item: any) => (
              <ProductGridItem key={item.id} product={item} />
            ))}
          </div>
        </div>
      )}
    </React.Fragment>
  )
}

const queryFabricBySlug = async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'fabrics' as any,
    draft,
    limit: 1,
    overrideAccess: draft,
    pagination: false,
    where: {
      and: [
        {
          slug: {
            equals: slug,
          },
        },
        ...(draft ? [] : [{ _status: { equals: 'published' } }]),
      ],
    },
  })

  return result.docs?.[0] || null
}
