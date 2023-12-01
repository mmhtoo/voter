import { headers } from 'next/headers'
import { Webhook } from 'svix'
import { UserJSON, WebhookEvent } from '@clerk/nextjs/server'
import createNewCustomer from '@/actions/customer/createNewCustomer'
import { DEFAULT_POINT } from '@/libs/data/constants'
import { revalidatePath } from 'next/cache'

export async function POST(req: Request) {
  // getting WEBHOOK_SECRET FROM env
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET
  if (!WEBHOOK_SECRET) {
    throw new Error('Please add web hook secret!')
  }

  // getting headers
  const headerPayload = headers()
  const svix_id = headerPayload.get('svix-id')
  const svix_timestamp = headerPayload.get('svix-timestamp')
  const svix_signature = headerPayload.get('svix-signature')

  if (!svix_id || !svix_timestamp || !svix_signature) {
    throw new Error('Invalid headers!')
  }

  // get the body
  const payload = await req.json()
  const body = JSON.stringify(payload)

  // creating svix instance with webbook secret
  const webhook = new Webhook(WEBHOOK_SECRET)

  let evt: WebhookEvent

  try {
    evt = webhook.verify(body, {
      'svix-id': svix_id,
      'svix-signature': svix_signature!,
      'svix-timestamp': svix_timestamp,
    }) as WebhookEvent
  } catch (e) {
    return new Response('Error occured!', {
      status: 400,
    })
  }

  // get the data and type
  const data = evt.data
  const eventType = evt.type

  switch (eventType) {
    case 'user.created':
      const user = data as UserJSON
      const response = await createNewCustomer({
        username: user.username!,
        email: user.email_addresses[0].email_address!,
        points: DEFAULT_POINT as number,
        clerkUserId: user.id,
      })
      if (response.status != 'Success') {
        return new Response('Failed!', {
          status: 400,
        })
      }
      // revalidatePath('/admin/dashboard')
      return new Response('Success', {
        status: 200,
      })
  }

  return new Response('', {
    status: 200,
  })
}
