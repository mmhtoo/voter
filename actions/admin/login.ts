'use server'
import { sql } from '@vercel/postgres'
import bcrypt from 'bcrypt'

export default async function login(
  email: string,
  password: string
): Promise<ActionResponse> {
  try {
    const queryResult = await sql<Admin>`
      SELECT * FROM admin t
      WHERE t.email = ${email} LIMIT 1
    `
    if (!queryResult || queryResult.rowCount == 0)
      return { message: 'Bad Credentials!', status: 'Failed' }

    const savedAdmin = queryResult.rows[0]
    const isSame = await bcrypt.compare(password, savedAdmin.password)

    if (!isSame) return { message: 'Bad Credentials!', status: 'Failed' }

    return {
      message: 'Successfully logged in!',
      status: 'Success',
    }
  } catch (e) {
    console.log('Error at admin/login line 22 ', e)
    throw e
  }
}
