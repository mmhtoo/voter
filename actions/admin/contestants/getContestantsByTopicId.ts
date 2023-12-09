'use server'
import { sql } from '@vercel/postgres'
import { cache } from 'react'

async function getContestantsByTopicId(topicId: string) {
  try {
    const result = await sql<Contestant>`
      SELECT * FROM contestants t
      WHERE t.topics_id = ${topicId}
    `
    return result.rows
  } catch (e) {
    console.log('Error at getContestantsByTopicId ', e)
    throw e
  }
}

export default cache(async (topicId: string) => {
  return await getContestantsByTopicId(topicId)
})
