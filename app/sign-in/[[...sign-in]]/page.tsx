'use client'
import { SignIn } from '@clerk/nextjs'

export default function LoginPage() {
  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-white">
      <SignIn />
    </div>
  )
}
