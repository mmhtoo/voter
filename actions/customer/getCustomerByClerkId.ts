'use server'

import { sql } from '@vercel/postgres'

export default async function getCustomerByClerkId(clerkId: string) {
  try {
    const response = await sql<{ userid: string }>`
      SELECT id as userid FROM customers t
      WHERE t.clerk_user_id = ${clerkId}
    `
    return response.rows[0]
  } catch (e) {
    console.log('Error at getCustomerByClerkId ', e)
    throw e
  }
}
