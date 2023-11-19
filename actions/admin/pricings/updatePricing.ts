'use server'

import { UpdatePricingForm, updatePricingSchema } from '@/libs/schemas'
import { today } from '@/libs/utils'
import { sql } from '@vercel/postgres'
import { revalidatePath } from 'next/cache'
import getPricingByPoint from './getTopicByPoint'

export default async function updatePricing(
  param: UpdatePricingForm
): Promise<ActionResponse> {
  try {
    const validation = updatePricingSchema.safeParse(param)
    if (!validation.success) {
      return {
        message: 'Invalid request datas, please try again!',
        status: 'Failed',
      }
    }

    const savedPricing = await getPricingByPoint(Number(param.point))

    if (savedPricing != null && savedPricing.id != param.id) {
      return {
        message:
          "You've already defined amount for current point value, please defined for another related value!",
        status: 'Failed',
      }
    }

    const updatePricingQuery = await sql`
      UPDATE pricings t
      SET amount = ${param.amount}, point = ${
      param.point
    }, updated_at = ${today()}
      WHERE t.id = ${param.id}
    `
    if (updatePricingQuery.rowCount === 0) {
      return {
        message: 'Failed to create new pricing!',
        status: 'Failed',
      }
    }

    revalidatePath('/admin/dashboard/pricings')
    return {
      message: 'Successfully updated!',
      status: 'Success',
    }
  } catch (e) {
    console.log('Error at createPricing ', e)
    return {
      message: 'Something went wrong, please try again or later!',
      status: 'Failed',
    }
  }
}
