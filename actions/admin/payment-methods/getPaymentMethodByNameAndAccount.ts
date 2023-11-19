'use server'

import { sql } from '@vercel/postgres'

export default async function getPaymentMethodByNameAndAccount(
  name: string,
  account: string
) {
  try {
    const result = await sql<PaymentMethod>`
      SELECT * FROM payment_methods t
      WHERE t.name = ${name} or t.account_number = ${account}
    `
    return result.rows[0]
  } catch (e) {
    console.log('Error at getPaymentMethodByNameAndAccount ', e)
    throw e
  }
}
