import { SignIn } from '@clerk/nextjs'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sign In',
}

export default function LoginPage() {
  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-white">
      <SignIn />
    </div>
  )
}
