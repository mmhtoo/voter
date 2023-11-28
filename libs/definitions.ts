type Admin = {
  id: string
  username: string
  email: string
  password: string
  phone: string
  created_at: Date | string
  updated_at?: Date | string
}

type ActionStatus = 'Success' | 'Failed' | 'UnActive'

type Customer = {
  id: string
  username: string
  email: string
  password: string
  phone?: string
  points: number
  created_at: Date | string
  updated_at: Date | string
}

type Topics = {
  id: string
  name: string
  description: string
  points_per_vote: number
  from_date: Date | string
  to_date: Date | string
  image_name: string
  status: 'active' | 'coming-soon' | 'died'
  created_date: Date | string
  updated_date: Date | string
}

type Pricing = {
  id: string
  point: number
  amount: number
  created_at: Date | string
  updated_at: Date | string
  sold_count: number
}

type PaymentMethod = {
  id: number
  name: string
  phone: string
  account_number: string
  created_at: Date
  updated_at: Date
  cash_in_count: number
}

type ActionResponse = {
  message: string
  status: ActionStatus
}

type ErrorPageProps = {
  error: Error & { digest?: string }
  reset: () => void
}
