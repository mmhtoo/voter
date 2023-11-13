'use server'

import { sql } from '@vercel/postgres'

export default async function getAllTopics() {
  try {
    const allTopicsQuery = await sql<Topics>`
      SELECT * FROM topics
    `
    return allTopicsQuery.rows
  } catch (e) {
    console.log('Error at getAllTopics ', e)
    throw e
  }
}
