import { SignUp } from '@clerk/nextjs'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sign Up',
}

export default function RegisterPage() {
  return (
    <div className="w-full min-h-screen p-[64px] mb-[32px] bg-white flex justify-center items-center">
      <SignUp />
    </div>
  )
}
