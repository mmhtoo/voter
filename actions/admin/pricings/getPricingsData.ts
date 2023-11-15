'use server'
import { sql } from '@vercel/postgres'

export default async function getPricingData() {
  try {
    const pricingsQuery = await sql<Pricing>`
      SELECT * FROM pricings
    `
    return pricingsQuery.rows
  } catch (e) {
    console.log('Error at getPricingData ', e)
    throw e
  }
}
