'use server'
import { sql } from '@vercel/postgres'

export default async function getCustomersData() {
  try {
    const customersQuery = await sql<Customer>`
      SELECT id, username , email , phone, points , created_at
      FROM customers
    `
    return customersQuery.rows
  } catch (e) {
    console.log('Error at getCustomersData ', e)
    throw e
  }
}
