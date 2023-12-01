'use server'

import { sql } from '@vercel/postgres'

export default async function confirmRequestPoint(
  requestId: number
): Promise<ActionResponse> {
  try {
    const result = await sql`
      UPDATE customers_request_points t
      SET has_confirmed = true 
      WHERE t.id = ${requestId}
    `

    if (result.rowCount == 0) {
      return {
        status: 'Failed',
        message: 'Failed to confirm!',
      }
    }
    return {
      status: 'Success',
      message: 'Successfully confirmed!',
    }
  } catch (e) {
    console.log('Error at confirmRequestPoint ', e)
    return {
      status: 'Failed',
      message: 'Something went wrong, please try again or later!',
    }
  }
}
