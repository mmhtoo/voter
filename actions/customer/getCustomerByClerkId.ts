'use server'

import { sql } from '@vercel/postgres'
import { unstable_noStore } from 'next/cache'

export async function getCustomerIdByClerkId(clerkId: string) {
  try {
    const response = await sql<{ userid: string }>`
      SELECT id as userid FROM customers t
      WHERE t.clerk_user_id = ${clerkId}
    `
    return response.rows[0]
  } catch (e) {
    console.log('Error at getCustomerIdByClerkId ', e)
    throw e
  }
}

export async function getCustomerByClerkId(clerkId: string) {
  try {
    unstable_noStore()
    const response = await sql<Customer>`
      SELECT * FROM customers t
      WHERE t.clerk_user_id = ${clerkId}
    `
    return response.rows[0]
  } catch (e) {
    console.log('Error at getCustomerByClerkId ', e)
    throw e
  }
}
