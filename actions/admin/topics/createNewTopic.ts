'use server'

import getTopicByName from './getTopicByName'
import { sql } from '@vercel/postgres'
import { CreateTopicForm, createTopicSchema } from '@/libs/schemas'
import { revalidatePath } from 'next/cache'
import { formatPsqlDate } from '@/libs/utils'

export default async function createNewTopic(
  param: CreateTopicForm
): Promise<ActionResponse> {
  try {
    const validation = createTopicSchema.safeParse(param)

    if (!validation.success) {
      return {
        message: 'Invalid request datas, please try again!',
        status: 'Failed',
      }
    }

    const savedTopics = await getTopicByName(param.name)

    if (savedTopics)
      return {
        message: "Topic's name should not be duplicate!",
        status: 'Failed',
      }

    const queryResult = await sql`
      INSERT INTO topics (name,description,points_per_vote,from_date,to_date,status)
      VALUES (${param.name},${param.description},${
      param.pointsPerVote
    },${formatPsqlDate(param.fromDate)},${formatPsqlDate(
      param.toDate
    )},${'coming-soon'})
    `

    if (queryResult.rowCount == 0) {
      return {
        message: 'Something went wrong, please try again or later!',
        status: 'Failed',
      }
    }

    revalidatePath('/admin/dashboard')
    revalidatePath('/admin/dashboard/topics')

    return {
      message: 'Successfully created new topic!',
      status: 'Success',
    }
  } catch (e) {
    console.log('Errot at createNewTopic ', e)
    return {
      message: 'Something went wrong, please try again or later!',
      status: 'Failed',
    }
  }
}
