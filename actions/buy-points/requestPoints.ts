'use server'

import { RequestBuyPointsForm, requestBuyPointsSchema } from '@/libs/schemas'
import { sql } from '@vercel/postgres'
import { revalidatePath } from 'next/cache'

export default async function requestPoints(
  param: RequestBuyPointsForm
): Promise<ActionResponse> {
  try {
    const validation = requestBuyPointsSchema.safeParse(param)
    if (!validation.success) {
      return {
        message: 'Invalid Information!',
        status: 'Failed',
      }
    }
    const result = await sql`
      INSERT INTO customers_request_points (customer_id,payment_method_id,pricing_id,screenshoot_image)
      VALUES (${param.clerkId},${param.paymentMethodId},${param.pricingId},${param.screenshoot})
    `
    if (result.rowCount == 0) {
      return {
        message: 'Failed to buy points, please try again!',
        status: 'Failed',
      }
    }
    revalidatePath('/admin/dashboard/point-requests')
    revalidatePath('/admin/dashboard')
    return {
      message:
        'Successfully done, please wait a few minutes for confirmation payment from admin!',
      status: 'Success',
    }
  } catch (e) {
    console.log('Error at requestPoints ', e)
    return {
      message: 'Something went wrong, please try again or later!',
      status: 'Failed',
    }
  }
}
