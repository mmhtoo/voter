'use server'

import { sql } from '@vercel/postgres'

export default async function saveContestants(
  params: Partial<Contestant>[]
): Promise<ActionResponse> {
  console.log(params)
  try {
    const promises = Promise.all([
      ...params.map((param) => saveContestant(param)),
    ])
    const effectRows = await promises
    console.log(effectRows)

    return {
      status: effectRows.includes(0) ? 'Failed' : 'Success',
      message: effectRows.includes(0)
        ? 'Failed to save contestants, please try again or later!'
        : 'Successfully added!',
    }
  } catch (e) {
    console.log('Error at saveContestants ', e)
    return {
      status: 'Failed',
      message: 'Something went wrong, please try again or later!',
    }
  }
}

export async function saveContestant(param: Partial<Contestant>) {
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
