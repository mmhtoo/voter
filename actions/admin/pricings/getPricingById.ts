'use server'

import { sql } from '@vercel/postgres'

export default async function getPricingById(id: string): Promise<Pricing> {
  try {
    const pricingQuery = await sql<Pricing>`
      SELECT * FROM pricings t
      WHERE t.id = ${id}
    `
    return pricingQuery.rows[0]
  } catch (e) {
    console.log('Error at getPricingById ', e)
    throw e
  }
}
