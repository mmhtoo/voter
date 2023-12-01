'use server'

import { sql } from '@vercel/postgres'
import { revalidatePath } from 'next/cache'

export default async function deletePaymentMethod(
  id: number
): Promise<ActionResponse> {
  try {
    const result = await sql`
      DELETE FROM payment_methods t
      WHERE t.id = ${id}
    `

    if (result.rowCount == 0) {
      return {
        message: 'Failed to delete, please try again!',
        status: 'Failed',
      }
    }
    revalidatePath('/admin/dashboard/payment-methods')
    return {
      message: 'Successfully deleted!',
      status: 'Success',
    }
  } catch (e) {
    console.log('Error at deletePayment ', e)
    return {
      message: 'Something went wrong, please try again or later!',
      status: 'Failed',
    }
  }
}
