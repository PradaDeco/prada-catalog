import type { Metadata } from 'next'

const defaultOpenGraph: Metadata['openGraph'] = {
  type: 'website',
  description: 'Catálogo de telas y persianas Prada Design.',
  images: [
    {
      url: '/logo-prada.png',
    },
  ],
  siteName: 'Prada Design',
  title: 'Prada Design',
}

export const mergeOpenGraph = (og?: Partial<Metadata['openGraph']>): Metadata['openGraph'] => {
  return {
    ...defaultOpenGraph,
    ...og,
    images: og?.images ? og.images : defaultOpenGraph.images,
  }
}
