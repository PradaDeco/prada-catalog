import type { CollectionSlug, GlobalSlug, Payload, PayloadRequest } from 'payload'
import { contactFormData } from './contact-form'
import { contactPageData } from './contact-page'
import { homePageData } from './home'
import { imageHatData } from './image-hat'
import { imageHero1Data } from './image-hero-1'
import path from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const collections: CollectionSlug[] = [
  'categories',
  'media',
  'pages',
  'fabrics',
  'forms',
  'form-submissions',
]

const categories = [
  'Blackout',
  'Decorativas',
  'Screen',
  'Sheer Polyester and Sheer Screen',
  'Onda Textil Blackout',
  'Onda Textil Blackout II',
  'Onda Textil Velos',
]
const globals: GlobalSlug[] = ['header', 'footer']

export const seed = async ({
  payload,
  req,
}: {
  payload: Payload
  req: PayloadRequest
}): Promise<void> => {
  payload.logger.info('Seeding database for Fabrics Catalog...')

  payload.logger.info(`— Seeding admin user...`)

  const adminEmail = process.env.ADMIN_EMAIL
  const adminPassword = process.env.ADMIN_PASSWORD

  if (!adminEmail || !adminPassword) {
    payload.logger.warn(
      '— Skipping admin user: set ADMIN_EMAIL and ADMIN_PASSWORD to seed an administrator.',
    )
  } else {
    const existingAdmin = await payload.find({
      collection: 'users',
      where: { email: { equals: adminEmail } },
      limit: 1,
      req,
    })

    if (existingAdmin.docs.length === 0) {
      await payload.create({
        collection: 'users',
        data: {
          name: 'Administrador',
          email: adminEmail,
          password: adminPassword,
          roles: ['admin'],
        },
        req,
      })
      payload.logger.info(`— Created admin user: ${adminEmail}`)
    } else {
      payload.logger.info(`— Admin user already exists: ${adminEmail}`)
    }
  }

  payload.logger.info(`— Clearing media...`)
  const mediaDocs = await payload.find({
    collection: 'media',
    depth: 0,
    limit: 300,
    pagination: false,
  })

  const promises = mediaDocs.docs.map((row) => {
    return payload.delete({
      collection: 'media',
      id: row.id,
      req,
    })
  })

  await Promise.all(promises)

  payload.logger.info(`— Clearing collections and globals...`)

  await Promise.all(
    collections.map((collection) =>
      payload.delete({
        collection,
        where: {
          id: {
            exists: true,
          },
        },
        req,
      }),
    ),
  )

  await Promise.all(
    globals.map((global) =>
      payload.updateGlobal({
        slug: global,
        data: {},
        req,
      }),
    ),
  )

  payload.logger.info(`— Seeding categories and media...`)

  const [imageHero1Buffer, imageHatBuffer] = await Promise.all([
    fs.promises.readFile(path.resolve(dirname, './hat-logo.png')),
    fs.promises.readFile(path.resolve(dirname, './hat-logo.png')),
  ])

  const imageHero1Doc = await payload.create({
    collection: 'media',
    data: imageHero1Data,
    file: {
      data: imageHero1Buffer,
      mimetype: 'image/png',
      name: 'hero-1.png',
      size: imageHero1Buffer.length,
    },
    req,
  })

  const imageSampleDoc = await payload.create({
    collection: 'media',
    data: imageHatData,
    file: {
      data: imageHatBuffer,
      mimetype: 'image/png',
      name: 'sample-fabric.png',
      size: imageHatBuffer.length,
    },
    req,
  })

  const categoryDocs = await Promise.all(
    categories.map((cat) =>
      payload.create({
        collection: 'categories',
        data: {
          title: cat,
          slug: cat.toLowerCase(),
        },
        req,
      }),
    ),
  )

  payload.logger.info(`— Seeding sample fabrics...`)

  const sampleFabrics = [
    {
      title: 'Lino Natural Beige',
      slug: 'lino-natural-beige',
      sku: 'LIN-001',
      composition: '100% Lino Europeo',
      width: '140 cm',
      weight: '280 g/m²',
      pattern: 'Liso',
      color: 'Beige Natural',
      usage: 'Cortinas, Tapicería, Mantelería',
      careInstructions: 'Lavado en seco o a mano a 30°C',
      priceInUSD: 35,
      categories: [categoryDocs[0].id],
      gallery: [{ image: imageSampleDoc.id }],
      _status: 'published' as const,
    },
    {
      title: 'Terciopelo Royal Azul',
      slug: 'terciopelo-royal-azul',
      sku: 'TER-002',
      composition: '100% Algodón Peinado',
      width: '145 cm',
      weight: '420 g/m²',
      pattern: 'Liso Brillante',
      color: 'Azul Real',
      usage: 'Tapicería fina, Cojines, Cortinajes pesados',
      careInstructions: 'Limpieza en seco profesional',
      priceInUSD: 52,
      categories: [categoryDocs[2].id],
      gallery: [{ image: imageSampleDoc.id }],
      _status: 'published' as const,
    },
  ]

  for (const fabric of sampleFabrics) {
    await payload.create({
      collection: 'fabrics',
      data: fabric as any,
      req,
    })
  }

  payload.logger.info(`— Seeding contact form and pages...`)

  const contactForm = await payload.create({
    collection: 'forms',
    data: contactFormData(),
    req,
  })

  await payload.create({
    collection: 'pages',
    data: contactPageData({
      contactForm: contactForm,
    }),
    req,
  })

  await payload.create({
    collection: 'pages',
    data: homePageData({
      contentImage: imageSampleDoc,
      metaImage: imageHero1Doc,
    }),
    req,
  })

  payload.logger.info(`— Seeding header and footer...`)

  await payload.updateGlobal({
    slug: 'header',
    data: {
      navItems: [
        {
          link: {
            type: 'custom',
            label: 'Catálogo',
            url: '/catalogo',
          },
        },
        {
          link: {
            type: 'custom',
            label: 'Quiénes Somos',
            url: '/quienes-somos',
          },
        },
        {
          link: {
            type: 'custom',
            label: 'Contacto',
            url: '/contact',
          },
        },
      ],
    },
    req,
  })

  await payload.updateGlobal({
    slug: 'footer',
    data: {
      navItems: [
        {
          link: {
            type: 'custom',
            label: 'Inicio',
            url: '/',
          },
        },
        {
          link: {
            type: 'custom',
            label: 'Catálogo',
            url: '/catalogo',
          },
        },
        {
          link: {
            type: 'custom',
            label: 'Contacto',
            url: '/contact',
          },
        },
      ],
    },
    req,
  })

  payload.logger.info('Seeding completed successfully!')
}
