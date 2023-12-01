'use server'

import { sql } from '@vercel/postgres'

type RequestPointsResult = {
  request_id: number
  screenshoot_image: string
  username: string
  email: string
  user_id: string
  payment_name: string
  phone: string | null
  account_number: string | null
  amount: number
  point: number
  has_confirmed: boolean
}

export default async function getRequestPoints(
  page: number = 1,
  size: number = 3,
  query: string = '',
  hasConfirmed: boolean = false
) {
  try {
    const offset = page - 1
    const result = await sql<RequestPointsResult>`
      SELECT t1.id as request_id , 
      t1.screenshoot_image as screenshoot_image, 
      t2.username as username , 
      t2.email as email , 
      t1.has_confirmed as has_confirmed,
      t2.id as user_id ,
      t3.name as payment_name,
      t3.phone as phone,
      t3.account_number as account_number,
      t4.amount as amount,
      t4.point as point FROM customers_request_points t1 
      LEFT JOIN customers t2 
      ON t1.customer_id = t2.id
      LEFT JOIN payment_methods t3
      ON t3.id = t1.payment_method_id
      LEFT JOIN pricings t4
      ON t4.id = t1.pricing_id
      WHERE t1.has_confirmed = ${hasConfirmed}
      LIMIT ${size} OFFSET ${offset}
    `
    return result.rows
  } catch (e) {
    console.log('Error at getRequestPoints ', e)
    throw e
  }
}
