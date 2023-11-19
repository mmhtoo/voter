'use server'

import { CreatePricingForm, createPricingSchema } from '@/libs/schemas'
import { sql } from '@vercel/postgres'
import { revalidatePath } from 'next/cache'
import getPricingByPoint from './getTopicByPoint'

export default async function createPricing(
  param: CreatePricingForm
): Promise<ActionResponse> {
  try {
    const validation = createPricingSchema.safeParse(param)
    if (!validation.success) {
      return {
        message: 'Invalid request datas, please try again!',
        status: 'Failed',
      }
    }

    const savedPricing = await getPricingByPoint(Number(param.point))

    if (savedPricing) {
      return {
        message: "You've alredy defined amount for current point!",
        status: 'Failed',
      }
    }

    const createPricingQuery = await sql`
      INSERT INTO pricings (point,amount)
      VALUES (${param.point},${param.amount})
    `
    if (createPricingQuery.rowCount === 0) {
      return {
        message: 'Failed to create new pricing!',
        status: 'Failed',
      }
    }

    revalidatePath('/admin/dashboard/pricings')
    return {
      message: 'Successfully created!',
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
