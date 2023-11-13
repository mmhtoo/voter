import { Menu } from 'lucide-react'
import { ThemeSwitcher } from './theme-switcher'
import { Button } from './ui/button'
import { DropdownMenu, DropdownMenuTrigger } from './ui/dropdown-menu'
import { Label } from './ui/label'

export default function DashboardHeader() {
  return (
    <header
      className={
        'w-full py-4 px-[64px] border fixed top-0 left-0  right-0 overflow-hidden dark:bg-black bg-white flex items-center justify-between  '
      }>
      <h1 className="text-lg font-bold">Voter</h1>
      <div className={'md:flex hidden gap-5 align-items-center'}>
        <Label className="opacity-50">Home</Label>
        <Label className="opacity-50">Topics</Label>
        <Label className="opacity-50">Pricings</Label>
        <Label className="opacity-50">Point Requests</Label>
      </div>
      <div className="items-center gap-3  hidden md:flex">
        <ThemeSwitcher />
        <Button variant={'outline'} className="text-red-500 ">
          Logout
        </Button>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Menu />
        </DropdownMenuTrigger>
      </DropdownMenu>
    </header>
  )
}
