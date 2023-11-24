import { Label } from './ui/label'
import { Separator } from './ui/separator'

export default function AppFooter() {
  return (
    <div className="w-full pt-[24px]">
      <Separator />
      <div className="w-full flex  justify-around items-center py-5">
        <Label>Copy Right @ 2023 </Label>
        {/* <!-- Developed by mmh --> */}
      </div>
    </div>
  )
}
