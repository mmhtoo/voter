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
import { usePathname } from 'next/navigation'
import { cn } from '@/libs/utils'
import Link from 'next/link'

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
    label: 'Point Requests',
    href: '/admin/dashboard/point-requests',
  },
]

export default function DashboardHeader() {
  const { setTheme } = useTheme()
  const pathName = usePathname()

  return (
    <header
      className={
        'w-full py-3 md:px-[64px] px-[24px] border fixed top-0 left-0  right-0 overflow-hidden dark:bg-black bg-white flex items-center justify-between '
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
        <Button variant={'ghost'} className="text-red-500 ">
          Logout
        </Button>
      </div>
      <div className="md:hidden">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <MenuIcon />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-24 right-[64px]">
            <DropdownMenuItem>Home</DropdownMenuItem>
            <DropdownMenuItem>Topics</DropdownMenuItem>
            <DropdownMenuItem>Pricings</DropdownMenuItem>
            <DropdownMenuItem>Point Requests</DropdownMenuItem>
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
            <DropdownMenuItem className="text-red-500">Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
