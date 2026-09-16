import type { Block } from 'payload'

export const ThreeItemGrid: Block = {
  slug: 'threeItemGrid',
  fields: [
    {
      name: 'products',
      type: 'relationship',
      admin: {
        isSortable: true,
      },
      hasMany: true,
      label: 'Productos a mostrar',
      maxRows: 3,
      minRows: 3,
      relationTo: 'fabrics',
    },
  ],
  interfaceName: 'ThreeItemGridBlock',
  labels: {
    plural: 'Cuadrículas de tres elementos',
    singular: 'Cuadrícula de tres elementos',
  },
}
