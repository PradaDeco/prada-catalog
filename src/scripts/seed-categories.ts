/**
 * Run this script to seed only the fabric categories into the database.
 * Usage: pnpm ts-node --esm src/scripts/seed-categories.ts
 * Or via Next.js API: POST /api/next/seed  (from the admin dashboard)
 *
 * This is a reference — the categories are already in the seed endpoint.
 * To add them manually, go to /admin → Categories → Create.
 */

export const FABRIC_CATEGORIES = [
  'Blackout',
  'Decorativas',
  'Screen',
  'Sheer Polyester and Sheer Screen',
  'Onda Textil Blackout',
  'Onda Textil Blackout II',
  'Onda Textil Velos',
]
