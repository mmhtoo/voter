'use server'

import { sql } from '@vercel/postgres'

export default async function getPricingByPoint(
  point: number
): Promise<Pricing> {
  try {
    const pricingResult = await sql<Pricing>`
      SELECT * FROM pricings t 
      WHERE t.point = ${point}
    `
    return pricingResult.rows[0]
  } catch (e) {
    console.log('Error at getTopicByPoint ', e)
    throw e
  }
}
