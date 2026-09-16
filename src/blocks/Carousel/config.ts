import type { Block } from 'payload'

export const Carousel: Block = {
  slug: 'carousel',
  fields: [
    {
      name: 'populateBy',
      type: 'select',
      defaultValue: 'collection',
      options: [
        {
          label: 'Colección',
          value: 'collection',
        },
        {
          label: 'Selección individual',
          value: 'selection',
        },
      ],
    },
    {
      name: 'relationTo',
      type: 'select',
      admin: {
        condition: (_, siblingData) => siblingData.populateBy === 'collection',
      },
      defaultValue: 'fabrics',
      label: 'Colecciones a mostrar',
      options: [
        {
          label: 'Telas',
          value: 'fabrics',
        },
      ],
    },
    {
      name: 'categories',
      type: 'relationship',
      admin: {
        condition: (_, siblingData) => siblingData.populateBy === 'collection',
      },
      hasMany: true,
      label: 'Categorías a mostrar',
      relationTo: 'categories',
    },
    {
      name: 'limit',
      type: 'number',
      admin: {
        condition: (_, siblingData) => siblingData.populateBy === 'collection',
        step: 1,
      },
      defaultValue: 10,
      label: 'Límite',
    },
    {
      name: 'selectedDocs',
      type: 'relationship',
      admin: {
        condition: (_, siblingData) => siblingData.populateBy === 'selection',
      },
      hasMany: true,
      label: 'Selección',
      relationTo: ['fabrics'],
    },
    {
      name: 'populatedDocs',
      type: 'relationship',
      admin: {
        condition: (_, siblingData) => siblingData.populateBy === 'collection',
        description: 'Este campo se completa automáticamente al leer',
        disabled: true,
      },
      hasMany: true,
      label: 'Documentos completados',
      relationTo: ['fabrics'],
    },
    {
      name: 'populatedDocsTotal',
      type: 'number',
      admin: {
        condition: (_, siblingData) => siblingData.populateBy === 'collection',
        description: 'Este campo se completa automáticamente al leer',
        disabled: true,
        step: 1,
      },
      label: 'Total de documentos completados',
    },
  ],
  interfaceName: 'CarouselBlock',
  labels: {
    plural: 'Carruseles',
    singular: 'Carrusel',
  },
}
