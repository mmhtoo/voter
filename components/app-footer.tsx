import { ThemeSwitcher } from './theme-switcher'
import { Label } from './ui/label'

export default function AppFooter() {
  return (
    <div className="w-full flex justify-around items-center py-3">
      <Label>Copy Right @ 2023 </Label>
      <ThemeSwitcher />
    </div>
  )
}
