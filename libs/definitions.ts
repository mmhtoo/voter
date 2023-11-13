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
