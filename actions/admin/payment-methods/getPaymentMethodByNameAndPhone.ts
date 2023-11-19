'use server'

import { sql } from '@vercel/postgres'

export default async function getPaymentMethodByNameAndPhone(
  name: string,
  phone: string
) {
  try {
    const result = await sql<PaymentMethod>`
      SELECT * FROM payment_methods t
      WHERE t.name = ${name} or t.phone = ${phone}
    `
    return result.rows[0]
  } catch (e) {
    console.log('Error at getPaymentMethodByNameAndAccount ', e)
    throw e
  }
}
