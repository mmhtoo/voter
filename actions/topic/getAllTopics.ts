'use server'

import { sql } from '@vercel/postgres'

export default async function getAllTopics(
  page: number = 1,
  size: number = 3,
  query: string = ''
) {
  try {
    const offset = (page - 1) * size
    const result = await sql<Topics>`
      SELECT * FROM topics t
      LIMIT ${size} OFFSET ${offset}
      
    `
    return result.rows
  } catch (e) {
    console.log('Error at getAllTopics ', e)
    throw e
  }
}

export async function getTotalTopicsPageNumber(sizePerPage: number = 3) {
  try {
    const result = await sql<{ count: number }>`
      SELECT COUNT(*) AS count FROM topics
    `
    return Math.ceil(result.rows[0].count / sizePerPage)
  } catch (e) {
    console.log('Error at getTotalTopicPage ', e)
    throw e
  }
}
