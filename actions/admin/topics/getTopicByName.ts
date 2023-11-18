'use server'

import { sql } from '@vercel/postgres'

export default async function getTopicByName(name: string) {
  try {
    const likeName = `%${name}%`
    console.log(likeName)
    const topicByNameQuery = await sql<Topics>`
      SELECT * FROM topics t
      WHERE t.name ~~ ${likeName}
    `
    console.log(topicByNameQuery)
    return topicByNameQuery.rows[0]
  } catch (e) {
    console.log('Error at getTopicByName ', e)
    throw e
  }
}
