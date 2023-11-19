'use server'

import { sql } from '@vercel/postgres'

export default async function getAllPaymentMethods() {
  try {
    const methodsResult = await sql<PaymentMethod>`
      SELECT * FROM payment_methods
    `
    return methodsResult.rows
  } catch (e) {
    console.log('Error at getAllPaymentMethods ', e)
    throw e
  }
}
