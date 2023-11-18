const { db } = require('@vercel/postgres')
const {
  customers,
  admin,
  paymentMethods,
  pricings,
  topics,
  contestants,
} = require('../libs/data/seeders')
const bcrypt = require('bcrypt')

async function seedCustomers(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`
    console.log('---created extension uuid-oosp---')
    await client.sql`
      CREATE TABLE IF NOT EXISTS customers (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        username VARCHAR(30) NOT NULL,
        email VARCHAR(50) UNIQUE NOT NULL,
        password VARCHAR(100) NOT NULL,
        points INT DEFAULT 0,
        phone VARCHAR(20),
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP
      );
    `
    console.log('---created customers table---')
    await Promise.all([
      customers.map(async (customer) => {
        const hashedPassword = await bcrypt.hash(customer.password, 10)
        return client.sql`
          INSERT INTO customers (username,email,password)
          VALUES (${customer.username},${customer.email},${hashedPassword})
        `
      }),
    ])
    console.log('---saved customers---')
  } catch (error) {
    console.log('Database error' + error)
  }
}

async function seedAdmin(client) {
  try {
    await client.sql`
      CREATE EXTENSION IF NOT EXISTS "uuid-ossp"
    `
    await client.sql`
      CREATE TABLE IF NOT EXISTS admin (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        username VARCHAR(30) NOT NULL,
        email VARCHAR(50) UNIQUE NOT NULL,
        password VARCHAR(100) NOT NULL,
        phone VARCHAR(20),
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP
      )
    `
    const hashedPassword = await bcrypt.hash(admin.password, 10)
    await client.sql`
      INSERT INTO admin (username,email,password)
      VALUES (${admin.username},${admin.email},${hashedPassword})
    `
  } catch (e) {
    console.log('Error admin ' + e)
  }
}

async function seedPaymentMethods(client) {
  try {
    await client.sql`
      CREATE TABLE IF NOT EXISTS payment_methods (
        id SERIAL PRIMARY KEY,
        name VARCHAR(50) NOT NULL,
        phone VARCHAR(30),
        account_number VARCHAR(100),
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP
      )
    `
    await Promise.all(
      paymentMethods.map(async (payment) => {
        await client.sql`
          INSERT INTO payment_methods (name,phone,account_number)
          VALUES (${payment.name},${payment.phone},${payment.accountNumber})
        `
      })
    )
  } catch (e) {
    console.log('Error payments methods ' + e)
  }
}

async function seedPricings(client) {
  try {
    await client.sql`
      CREATE EXTENSION IF NOT EXISTS "uuid-ossp"
    `
    await client.sql`
     CREATE TABLE IF NOT EXISTS pricings (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      point INT NOT NULL,
      amount INT NOT NULL,
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP
     )
    `
    await Promise.all(
      pricings.map(async (pricing) => {
        await client.sql`
          INSERT INTO pricings (point,amount)
          VALUES (${pricing.pointCount},${pricing.amount})
        `
      })
    )
  } catch (e) {
    console.log('Error pricings ' + e)
  }
}

async function seedTopics(client) {
  try {
    await client.sql`
      CREATE TABLE IF NOT EXISTS topics (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        description TEXT NOT NULL,
        points_per_vote INT NOT NULL,
        from_date TIMESTAMP NOT NULL,
        to_date TIMESTAMP NOT NULL,
        status VARCHAR(30) NOT NULL,
        created_date TIMESTAMP DEFAULT NOW(),
        updated_date TIMESTAMP 
      )
    `
    await Promise.all(
      topics.map(async (topic) => {
        return await client.sql`
        INSERT INTO topics (name,description,points_per_vote,from_date,to_date,status)
        VALUES (${topic.name},${topic.description},${topic.pointPerVote},${topic.fromDate},${topic.toDate},${topic.status})
      `
      })
    )
  } catch (e) {
    console.log('Error topics ' + e)
  }
}

async function seedContestants(client) {
  try {
    await client.sql`
      CREATE TABLE IF NOT EXISTS contestants (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULl,
        description TEXT NOT NULL,
        image_name VARCHAR(100),
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP,
        vote_count INT NOT NULL DEFAULT 0,
        topics_id UUID NOT NULL,
        FOREIGN KEY(topics_id) REFERENCES topics(id)
      )
    `
    await Promise.all(
      contestants.map(async (contestants) => {
        return await client.sql`
          INSERT INTO contestants (name,description,image_name,topics_id)
          VALUES (${contestants.name},${contestants.description},${contestants.image_name},${contestants.topics_id})
        `
      })
    )
  } catch (e) {
    console.log('Error contestants ' + e)
  }
}

async function seedCustomerRequestPointBuy(client) {
  try {
    await client.sql`
      CREATE TABLE IF NOT EXISTS customers_request_points (
        id SERIAL NOT NULL PRIMARY KEY,
        customer_id UUID NOT NULL,
        payment_method_id INT NOT NULL,
        pricing_id UUID NOT NULL,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP,
        has_confirmed BOOLEAN DEFAULT false,
        screenshoot_image VARCHAR(200),
        FOREIGN KEY(customer_id) REFERENCES customers(id),
        FOREIGN KEY(payment_method_id) REFERENCES payment_methods(id),
        FOREIGN KEY(pricing_id) REFERENCES pricings(id)
      )
    `
  } catch (e) {
    console.log('points request error' + e)
  }
}

async function main() {
  const client = await db.connect()
  // await seedCustomers(client)
  // await seedAdmin(client)
  // await seedPaymentMethods(client)
  // await seedPricings(client)
  // await seedTopics(client)
  await seedContestants(client)
  // await seedCustomerRequestPointBuy(client)
  await client.release()
}

main()
