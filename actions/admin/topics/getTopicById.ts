'use server'
import { sql } from '@vercel/postgres'

export default async function getTopicById(id: string) {
  try {
    const topicQuery = await sql<Topics>`
      SELECT * FROM topics t 
      WHERE t.id = ${id}
    `
    return topicQuery.rows[0]
  } catch (e) {
    console.log('Error at getTopicById', e)
    throw e
  }
}
