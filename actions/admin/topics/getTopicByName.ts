'use server'

import { sql } from '@vercel/postgres'

export default async function getTopicByName(name: string) {
  try {
    const likeName = `%${name}%`
    const topicByNameQuery = await sql<Topics>`
      SELECT * FROM topics t
      WHERE t.name ~~ ${likeName}
    `
    return topicByNameQuery.rows[0]
  } catch (e) {
    console.log('Error at getTopicByName ', e)
    throw e
  }
}
