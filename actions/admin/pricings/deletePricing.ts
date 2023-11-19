'use server'

import { sql } from '@vercel/postgres'
import { revalidatePath } from 'next/cache'

export default async function deletePricing(
  id: string
): Promise<ActionResponse> {
  try {
    const pricingQuery = await sql`
      DELETE FROM pricings t
      WHERE t.id = ${id}
    `
    if (pricingQuery.rowCount === 0) {
      return {
        message: 'Failed to delete!',
        status: 'Failed',
      }
    }
    revalidatePath('/admin/dashboard/pricings')
    return {
      message: 'Successfully deleted!',
      status: 'Success',
    }
  } catch (e) {
    console.log('Error at deletePricing ', e)
    return {
      message: 'Something went wrong, pleast try again or later!',
      status: 'Failed',
    }
  }
}
