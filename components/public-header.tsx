'use client'
import { cn } from '@/libs/utils'
import {
  SignInButton,
  SignOutButton,
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
import { DropdownMenu } from '@radix-ui/react-dropdown-menu'
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { MenuIcon } from 'lucide-react'
import Link from 'next/link'
import { CurrentPoint, CurrentPointSkeleton } from './current-point'
import { Suspense } from 'react'

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
        'w-full py-3 md:px-[64px] px-[24px] border fixed top-0 left-0 z-50  right-0 overflow-hidden dark:bg-black bg-white flex items-center justify-between'
      )}>
      <h1>Voter</h1>
      <div className="md:flex hidden gap-6 align-items-center">
        <div className="flex items-center gap-14">
          <div className="flex items-center gap-5">
            <Label>
              <Link href={'/'}>Home</Link>
            </Label>
            <Label>
              <Link href={'/topics'}>Topics</Link>
            </Label>
            <Label>
              <Link href={'/buy-points'}>Buy Points</Link>
            </Label>
            <SignedIn>
              <Suspense fallback={<CurrentPointSkeleton />}>
                <CurrentPoint />
              </Suspense>
            </SignedIn>
          </div>
          <div className="flex items-center gap-2">
            <Label>{authUser.user?.username}</Label>
            <UserButton afterSignOutUrl={'/sign-in'} />
          </div>
        </div>
        <SignedOut>
          <div className="flex items-center gap-2">
            <SignInButton redirectUrl={'/sign-in'}>
              <Button variant={'outline'}>Sign In</Button>
            </SignInButton>
            <SignUpButton redirectUrl={'/sign-up'}>
              <Button>Sign Up</Button>
            </SignUpButton>
          </div>
        </SignedOut>
        <ThemeSwitcher />
        <SignedIn>
          <Label className="text-red-500 my-auto">
            <SignOutButton />
          </Label>
        </SignedIn>
      </div>
      <div className="md:hidden">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <MenuIcon />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>
              <Link href={'/'}>Home</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href={'/topics'}>Topics</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href={'/buy-points'}>Buy Points</Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="opacity-90">
              <CurrentPoint />
            </DropdownMenuItem>
            <SignedIn>
              <DropdownMenuItem className="flex items-center gap-3">
                <Label>{authUser?.user?.username}</Label>
                <UserButton />
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Label className="text-red-500">
                  <SignOutButton>Sign Out</SignOutButton>
                </Label>
              </DropdownMenuItem>
            </SignedIn>
            <SignedOut>
              <DropdownMenuItem>
                <SignUpButton />
              </DropdownMenuItem>
              <DropdownMenuItem>
                <SignInButton />
              </DropdownMenuItem>
            </SignedOut>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
