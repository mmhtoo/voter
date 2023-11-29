'use server'
import { sql } from '@vercel/postgres'

export type NewCustomerParam = {
  username: string
  email: string
  points: number
  clerkUserId: string
}

export default async function createNewCustomer(
  param: NewCustomerParam
): Promise<ActionResponse> {
  try {
    const { username, email, points, clerkUserId } = param
    const result = await sql`
      INSERT INTO customers (username,email,points,clerk_user_id)
      VALUES (${username},${email},${points},${clerkUserId})
    `
    if (result.rowCount == 0) {
      return {
        message: 'Something went wrong, please try again or later!',
        status: 'Failed',
      }
    }
    return {
      message: 'Successfully created!',
      status: 'Success',
    }
  } catch (e) {
    console.log('Error at createNewCustomer ', e)
    return {
      message: 'Failed to create customer!',
      status: 'Failed',
    }
  }
}
