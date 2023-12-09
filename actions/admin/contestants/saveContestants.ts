'use server'

import { sql } from '@vercel/postgres'

export default async function saveContestants(
  params: Contestant[]
): Promise<ActionResponse> {
  try {
  } catch (e) {
    console.log('Error at saveContestants ', e)
    return {
      status: 'Failed',
      message: 'Something went wrong, please try again or later!',
    }
  }
}

export async function saveContestant(param: Contestant) {
  try {
    const { name, description, image_name, topics_id, vote_count } = param
    const result = await sql`
      INSERT INTO contestants (name,description,image_name,topics_id,vote_count)
      VALUES (${name},${description},${image_name},${topics_id},${vote_count})
    `
    return result.rowCount
  } catch (e) {
    console.log('Error at saveContestant ', e)
    throw e
  }
}
