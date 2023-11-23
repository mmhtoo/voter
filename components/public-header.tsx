'use client'
import { cn } from '@/libs/utils'
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
} from '@clerk/nextjs'
import { usePathname } from 'next/navigation'
import { ThemeSwitcher } from './theme-switcher'
import { Label } from './ui/label'
import { Button } from './ui/button'

export default function PublicHeader() {
  const path = usePathname()
  const authUser = useUser()

  if (
    path.includes('admin') ||
    path.startsWith('/sign-in') ||
    path.startsWith('/sign-up')
  )
    return null

  return (
    <header
      className={cn(
        'w-full py-2 md:px-[64px] px-[24px] border fixed top-0 left-0 z-50  right-0 overflow-hidden dark:bg-black bg-white flex items-center justify-between'
      )}>
      <h1>Voter</h1>
      <div className="flex items-center gap-6">
        <SignedIn>
          <div className="flex items-center gap-2">
            <Label>{authUser.user?.username}</Label>
            <UserButton afterSignOutUrl={'/sign-in'} />
          </div>
        </SignedIn>
        <SignedOut>
          <div className="flex items-center gap-2">
            <Button variant={'outline'}>
              <SignInButton redirectUrl={'/sign-in'} />
            </Button>
            <Button>
              <SignUpButton redirectUrl={'/sign-up'} />
            </Button>
          </div>
        </SignedOut>
        <ThemeSwitcher />
      </div>
    </header>
  )
}
