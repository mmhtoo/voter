'use client'
import { MenuIcon } from 'lucide-react'
import { ThemeSwitcher } from './theme-switcher'
import { Button } from './ui/button'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from './ui/dropdown-menu'
import { Label } from './ui/label'
import { useTheme } from 'next-themes'
import { usePathname, useRouter } from 'next/navigation'
import { cn } from '@/libs/utils'
import Link from 'next/link'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
} from './ui/alert-dialog'
import { useState } from 'react'
import useLogout from '@/libs/hooks/useLogout'

const LINKS = [
  {
    id: '1',
    label: 'Home',
    href: '/admin/dashboard',
  },
  {
    id: '2',
    label: 'Users',
    href: '/admin/dashboard/users',
  },
  {
    id: '3',
    label: 'Topics',
    href: '/admin/dashboard/topics',
  },
  {
    id: '4',
    label: 'Pricings',
    href: '/admin/dashboard/pricings',
  },
  {
    id: '5',
    label: 'Payment Methods',
    href: '/admin/dashboard/payment-methods',
  },
  {
    id: '6',
    label: 'Point Requests',
    href: '/admin/dashboard/point-requests',
  },
]

export default function DashboardHeader() {
  const { setTheme } = useTheme()
  const pathName = usePathname()
  const [showLogoutModal, setShowLogoutModal] = useState(false)
  const logout = useLogout()

  return (
    <header
      className={
        'w-full py-3 md:px-[64px] px-[24px] border fixed top-0 left-0 z-50  right-0 overflow-hidden dark:bg-black bg-white flex items-center justify-between '
      }>
      <h1 className="text-lg font-bold">Voter</h1>
      <div className={'md:flex hidden gap-6 align-items-center'}>
        {LINKS.map((link) => {
          return (
            <Label key={link.id}>
              <Link
                href={link.href}
                className={cn('hover:opacity-100', {
                  'opacity-75': link.href != pathName,
                  'opacity-95 font-bold': link.href == pathName,
                })}>
                {link.label}
              </Link>
            </Label>
          )
        })}
      </div>
      <div className="items-center gap-3  hidden md:flex">
        <ThemeSwitcher />
        <Button
          onClick={() => setShowLogoutModal(true)}
          variant={'ghost'}
          className="text-red-500 ">
          Logout
        </Button>
      </div>
      <div className="md:hidden">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <MenuIcon />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-24 right-[64px]">
            {LINKS.map((link) => {
              return (
                <Link href={link.href}>
                  <DropdownMenuItem>{link.label}</DropdownMenuItem>
                </Link>
              )
            })}
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>Theme</DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                <DropdownMenuItem onClick={() => setTheme('light')}>
                  Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme('dark')}>
                  Dark
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme('system')}>
                  System
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
            <DropdownMenuItem
              onClick={() => setShowLogoutModal(true)}
              className="text-red-500">
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <AlertDialog open={showLogoutModal}>
        <AlertDialogContent>
          <AlertDialogHeader className="text-red-500">
            Are you sure to logout?
          </AlertDialogHeader>
          <AlertDialogDescription>
            If you want to continue, press Yes button.
          </AlertDialogDescription>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setShowLogoutModal(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={logout}>Yes</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </header>
  )
}
