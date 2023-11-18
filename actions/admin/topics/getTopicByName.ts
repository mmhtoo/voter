'use server'

import { sql } from '@vercel/postgres'

export default async function getTopicByName(name: string) {
  try {
    const topicByNameQuery = await sql`
      SELECT * FROM topics t
      WHERE t.name LIKE '%${name}%'
    `
    return topicByNameQuery.rows[0]
  } catch (e) {
    console.log('Error at getTopicByName ', e)
    throw e
  }
}
