'use server'

import { today } from '@/libs/utils'
import { sql } from '@vercel/postgres'

export default async function getComingSoonTopicsForHomePage() {
  try {
    const response = await sql<Topics>`
      SELECT * FROM topics t 
      WHERE t.from_date > ${today()}
      LIMIT 3
    `
    return response.rows
  } catch (e) {
    console.log('Error at getComingSoonTopics ', e)
    throw e
  }
}
