'use server'

import { EditTopicForm } from '@/libs/schemas'
import { sql } from '@vercel/postgres'
import { revalidatePath } from 'next/cache'

export default async function updateTopics(
  param: EditTopicForm
): Promise<ActionResponse> {
  try {
    const updateQueryResulse = await sql`
      UPDATE topics t
      SET name = ${param.name}, description = ${param.description}, 
      points_per_vote = ${
        param.pointsPerVote
      }, updated_date = ${new Date().toUTCString()}
      WHERE t.id = ${param.id}
    `

    if (updateQueryResulse.rowCount == 0) {
      return {
        message: 'Something went wrong, please try again or later!',
        status: 'Failed',
      }
    }

    revalidatePath('/admin/dashboard/topics')
    revalidatePath(`/admin/dashboard/topics/${param.id}`)

    return {
      message: 'Successfully updated topics!',
      status: 'Success',
    }
  } catch (e) {
    console.log('Error at updateTopics ', e)
    return {
      message: 'Something went wrong, please try again or later!',
      status: 'Failed',
    }
  }
}
