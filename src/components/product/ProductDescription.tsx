'use client'
import { RichText } from '@/components/RichText'
import { Price } from '@/components/Price'
import React from 'react'

export function ProductDescription({ product }: { product: any }) {
  const price = product?.priceInUSD

  const specs = [
    { label: 'Código / SKU', value: product?.sku },
    { label: 'Composición', value: product?.composition },
    { label: 'Ancho', value: product?.width },
    { label: 'Peso / Gramaje', value: product?.weight },
    { label: 'Diseño / Patrón', value: product?.pattern },
    { label: 'Color', value: product?.color },
    { label: 'Uso Recomendado', value: product?.usage },
    { label: 'Cuidados', value: product?.careInstructions },
  ].filter((item) => Boolean(item.value))

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-2">
        <h1 className="text-3xl font-semibold">{product.title}</h1>
        {typeof price === 'number' && price > 0 && (
          <div className="font-mono text-xl">
            <Price amount={price} />
          </div>
        )}
      </div>

      {product.description ? (
        <RichText data={product.description} enableGutter={false} />
      ) : null}

      {specs.length > 0 && (
        <div className="mt-4 border rounded-xl p-4 bg-muted/40">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">
            Ficha Técnica
          </h2>
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-sm">
            {specs.map((spec) => (
              <div key={spec.label} className="flex justify-between border-b pb-1">
                <dt className="text-muted-foreground">{spec.label}:</dt>
                <dd className="font-medium text-right">{spec.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      )}
    </div>
  )
}
