import type { CollectionConfig } from 'payload'

import { CallToAction } from '@/blocks/CallToAction/config'
import { Content } from '@/blocks/Content/config'
import { MediaBlock } from '@/blocks/MediaBlock/config'
import { slugField } from 'payload'
import { generatePreviewPath } from '@/utilities/generatePreviewPath'
import { adminOrPublishedStatus } from '@/access/adminOrPublishedStatus'
import { isAdmin } from '@/access/isAdmin'
import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'
import {
  FixedToolbarFeature,
  HeadingFeature,
  HorizontalRuleFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const Fabrics: CollectionConfig = {
  slug: 'fabrics',
  labels: {
    singular: 'Tela',
    plural: 'Telas',
  },
  access: {
    create: isAdmin,
    delete: isAdmin,
    read: adminOrPublishedStatus,
    update: isAdmin,
  },
  admin: {
    defaultColumns: ['title', 'sku', 'composition', '_status', 'updatedAt'],
    livePreview: {
      url: ({ data, req }) =>
        generatePreviewPath({
          slug: data?.slug,
          collection: 'fabrics',
          req,
        }),
    },
    preview: (data, { req }) =>
      generatePreviewPath({
        slug: data?.slug as string,
        collection: 'fabrics',
        req,
      }),
    useAsTitle: 'title',
    group: 'Catálogo',
  },
  defaultPopulate: {
    title: true,
    slug: true,
    image: true,
    gallery: true,
    priceInUSD: true,
    sku: true,
    composition: true,
    categories: true,
    meta: true,
  },
  versions: {
    drafts: {
      autosave: true,
    },
    maxPerDoc: 50,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Nombre de la Tela',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Imagen Principal',
      admin: {
        description: 'Imagen principal que se muestra en el catálogo.',
      },
    },
    {
      type: 'tabs',
      tabs: [
        {
          fields: [
            {
              name: 'description',
              type: 'richText',
              editor: lexicalEditor({
                features: ({ rootFeatures }) => {
                  return [
                    ...rootFeatures,
                    HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
                    FixedToolbarFeature(),
                    InlineToolbarFeature(),
                    HorizontalRuleFeature(),
                  ]
                },
              }),
              label: false,
              required: false,
            },
            {
              name: 'gallery',
              type: 'array',
              label: 'Galería de Fotos',
              minRows: 1,
              fields: [
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                  required: true,
                },
              ],
            },
            {
              name: 'layout',
              type: 'blocks',
              blocks: [CallToAction, Content, MediaBlock],
            },
          ],
          label: 'Contenido',
        },
        {
          fields: [
            {
              name: 'sku',
              type: 'text',
              label: 'Código / Referencia',
            },
            {
              name: 'composition',
              type: 'text',
              label: 'Composición',
              admin: {
                placeholder: 'Ej: 100% Lino, 70% Algodón / 30% Poliéster',
              },
            },
            {
              name: 'width',
              type: 'text',
              label: 'Ancho',
              admin: {
                placeholder: 'Ej: 140 cm / 55 pulgadas',
              },
            },
            {
              name: 'weight',
              type: 'text',
              label: 'Peso / Gramaje',
              admin: {
                placeholder: 'Ej: 320 g/m²',
              },
            },
            {
              name: 'pattern',
              type: 'text',
              label: 'Diseño / Patrón',
              admin: {
                placeholder: 'Ej: Liso, Geométrico, Floral, Jacquard',
              },
            },
            {
              name: 'color',
              type: 'text',
              label: 'Color(es)',
            },
            {
              name: 'usage',
              type: 'text',
              label: 'Uso Recomendado',
              admin: {
                placeholder: 'Ej: Tapicería, Cortinas, Ropa de cama, Cojines',
              },
            },
            {
              name: 'careInstructions',
              type: 'text',
              label: 'Instrucciones de Cuidado',
              admin: {
                placeholder: 'Ej: Lavado en seco, no usar cloro, planchado suave',
              },
            },
            {
              name: 'priceInUSD',
              type: 'number',
              label: 'Precio Referencial (USD)',
              admin: {
                description: 'Opcional. Dejar vacío si no se muestra precio en el catálogo público.',
              },
            },
            {
              name: 'relatedFabrics',
              type: 'relationship',
              filterOptions: ({ id }) => {
                if (id) {
                  return {
                    id: {
                      not_in: [id],
                    },
                  }
                }
                return {
                  id: {
                    exists: true,
                  },
                }
              },
              hasMany: true,
              relationTo: 'fabrics',
              label: 'Telas Relacionadas',
            },
          ],
          label: 'Ficha Técnica',
        },
        {
          name: 'meta',
          label: 'SEO',
          fields: [
            OverviewField({
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
              imagePath: 'meta.image',
            }),
            MetaTitleField({
              hasGenerateFn: true,
            }),
            MetaImageField({
              relationTo: 'media',
            }),
            MetaDescriptionField({}),
            PreviewField({
              hasGenerateFn: true,
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
            }),
          ],
        },
      ],
    },
    {
      name: 'categories',
      type: 'relationship',
      admin: {
        position: 'sidebar',
        sortOptions: 'title',
      },
      hasMany: true,
      relationTo: 'categories',
    },
    slugField(),
  ],
}
