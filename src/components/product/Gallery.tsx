'use client'

import type { Fabric } from '@/payload-types'
import { Media } from '@/components/Media'
import React from 'react'

import { Carousel, CarouselApi, CarouselContent, CarouselItem } from '@/components/ui/carousel'

type Props = {
  gallery: NonNullable<Fabric['gallery']>
}

export const Gallery: React.FC<Props> = ({ gallery }) => {
  const [current, setCurrent] = React.useState(0)
  const [, setApi] = React.useState<CarouselApi>()

  if (!gallery?.length) return null

  const currentImage = gallery[current]?.image

  return (
    <div>
      <div className="relative w-full overflow-hidden mb-4 aspect-square rounded-2xl border bg-background">
        {currentImage && (
          <Media
            resource={currentImage}
            className="h-full w-full object-cover"
            imgClassName="h-full w-full object-cover rounded-2xl"
          />
        )}
      </div>

      {gallery.length > 1 && (
        <Carousel setApi={setApi} className="w-full" opts={{ align: 'start', loop: false }}>
          <CarouselContent>
            {gallery.map((item: any, i: number) => {
              if (!item?.image) return null

              return (
                <CarouselItem
                  className="basis-1/4 cursor-pointer"
                  key={item?.id || i}
                  onClick={() => setCurrent(i)}
                >
                  <div
                    className={`relative aspect-square rounded-lg border overflow-hidden transition-all ${
                      current === i ? 'ring-2 ring-primary border-primary' : 'opacity-70 hover:opacity-100'
                    }`}
                  >
                    <Media
                      resource={item.image}
                      className="h-full w-full object-cover"
                      imgClassName="h-full w-full object-cover"
                    />
                  </div>
                </CarouselItem>
              )
            })}
          </CarouselContent>
        </Carousel>
      )}
    </div>
  )
}
