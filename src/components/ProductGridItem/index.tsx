import Link from 'next/link'
import React from 'react'
import clsx from 'clsx'
import { Media } from '@/components/Media'
import { Price } from '@/components/Price'

type Props = {
  product: any
}

export const ProductGridItem: React.FC<Props> = ({ product }) => {
  const { gallery, priceInUSD, title, composition, sku } = product
  const price = priceInUSD

  const image =
    gallery?.[0]?.image && typeof gallery[0]?.image !== 'string' ? gallery[0]?.image : false

  return (
    <Link className="relative inline-block h-full w-full group" href={`/fabrics/${product.slug}`}>
      {image ? (
        <Media
          className={clsx(
            'relative aspect-square object-cover border rounded-2xl p-8 bg-primary-foreground',
          )}
          height={80}
          imgClassName={clsx('h-full w-full object-cover rounded-2xl', {
            'transition duration-300 ease-in-out group-hover:scale-102': true,
          })}
          resource={image}
          width={80}
        />
      ) : null}

      <div className="flex flex-col gap-1 mt-4">
        <div className="flex justify-between items-center">
          <div className="font-medium text-primary group-hover:text-primary/80 transition-colors">
            {title}
          </div>
          {typeof price === 'number' && price > 0 && (
            <div className="font-mono text-sm">
              <Price amount={price} />
            </div>
          )}
        </div>
        {(composition || sku) && (
          <div className="text-xs text-muted-foreground flex justify-between">
            {composition && <span>{composition}</span>}
            {sku && <span>Ref: {sku}</span>}
          </div>
        )}
      </div>
    </Link>
  )
}
