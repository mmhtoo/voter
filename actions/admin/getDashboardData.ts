'use server'

import { sql } from '@vercel/postgres'

export default async function getDashboardData() {
  try {
    const promises = Promise.all([
      getCustomersCount(),
      getTotalTopicsCount(),
      getActiveTopicsCount(),
    ])
    const data = await promises.then((result: [number, number, number]) => {
      const [customerCount, totalTopicsCount, activeTopicsCount] = result
      return {
        users: customerCount,
        totalTopics: totalTopicsCount,
        activeTopics: activeTopicsCount,
      }
    })
    return { ...data }
  } catch (e) {
    console.log('Error at getDashboardData.ts ', e)
    throw e
  }
}

type Count = { count: number }

const getCustomersCount = async () => {
  try {
    const userCountQuery = await sql<Count>`
      SELECT COUNT(*) count FROM customers
    `
    return userCountQuery.rows[0].count
  } catch (e) {
    console.log('Error at getCustomersCount.ts ', e)
    throw e
  }
}

const getTotalTopicsCount = async () => {
  try {
    const topicCountQuery = await sql<Count>`
      SELECT COUNT(*) count FROM topics
    `
    return topicCountQuery.rows[0].count
  } catch (e) {
    console.log('Error at getTotalTopicsCount.ts ', e)
    throw e
  }
}

const getActiveTopicsCount = async () => {
  try {
    const activeTopicsCountQuery = await sql<Count>`
      SELECT COUNT(*) count from topics t
      WHERE t.from_date >= NOW()
    `
    return activeTopicsCountQuery.rows[0].count
  } catch (e) {
    console.log('Error at getActiveTopicsCount.ts ', e)
    throw e
  }
}
