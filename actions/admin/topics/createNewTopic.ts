'use server'

import getTopicByName from './getTopicByName'
import { sql } from '@vercel/postgres'
import { CreateTopicForm } from '@/libs/schemas'

export default async function createNewTopic(
  param: CreateTopicForm
): Promise<ActionResponse> {
  try {
    const savedTopics = await getTopicByName(param.name)

    if (!savedTopics)
      return {
        message: "Topic's name should not be duplicate!",
        status: 'Failed',
      }

    const queryResult = await sql`
      INSERT INTO topics (name,description,points_per_vote,from_date,to_date,status)
      VALUES (${param.name},${param.description},${
      param.pointsPerVote
    },${param.fromDate.toString()},${param.toDate.toString()},${'coming-soon'})
    `
    console.log(queryResult)
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
