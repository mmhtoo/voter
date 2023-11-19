'use server'

import { sql } from '@vercel/postgres'
import { revalidatePath } from 'next/cache'

export default async function deleteTopicById(
  topicId: string
): Promise<ActionResponse> {
  try {
    const deleteResult = await sql`
      DELETE FROM  topics t
      WHERE t.id = ${topicId}
    `
    if (deleteResult.rowCount == 0) {
      return {
        message: 'Failed to delete topic!',
        status: 'Failed',
      }
    }

    revalidatePath('/admin/dashboard/topics')
    return {
      message: 'Successfully deleted!',
      status: 'Success',
    }
  } catch (e) {
    console.log('Error at deleteTopicById ', e)
    return {
      message: 'Something went wrong, please try again or later!',
      status: 'Failed',
    }
  }
}
