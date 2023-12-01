'use server'
import { sql } from '@vercel/postgres'
import { revalidatePath } from 'next/cache'

export default async function updatePointData(
  userId: string,
  point: number,
  action: '+' | '-'
): Promise<ActionResponse> {
  return action == '+'
    ? addPointData(userId, point)
    : subtractPointData(userId, point)
}

export async function addPointData(
  userId: string,
  point: number
): Promise<ActionResponse> {
  try {
    const response = await sql`
      UPDATE customers t
      SET points = t.points + ${point}
      WHERE t.id = ${userId}
    `
    const isSuccess = response.rowCount > 0
    revalidatePath('/admin/dashboard/request-points')
    return {
      status: isSuccess ? 'Success' : 'Failed',
      message: isSuccess
        ? "Successfully synchronized to customer's point!"
        : "Failed to synchronized to customer's point!",
    }
  } catch (e) {
    console.log('Error at updatePointData ', e)
    return {
      status: 'Failed',
      message: 'Something went wrong, please try again or later!',
    }
  }
}

async function subtractPointData(
  userId: string,
  point: number
): Promise<ActionResponse> {
  try {
    const response = await sql`
      UPDATE customers t
      SET points = t.points - ${point}
      WHERE t.id = ${userId}
    `
    const isSuccess = response.rowCount > 0
    revalidatePath('/admin/dashboard/request-points')
    return {
      status: isSuccess ? 'Success' : 'Failed',
      message: isSuccess
        ? "Successfully synchronized to customer's point!"
        : "Failed to synchronized to customer's point!",
    }
  } catch (e) {
    console.log('Error at updatePointData ', e)
    return {
      status: 'Failed',
      message: 'Something went wrong, please try again or later!',
    }
  }
}
