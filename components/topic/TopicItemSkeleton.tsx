import { ArrowRight, Calendar, Leaf, Users } from 'lucide-react'
import { Card, CardContent, CardHeader } from '../ui/card'
import { Label } from '../ui/label'
import { Skeleton } from '../ui/skeleton'
import { Button } from '../ui/button'

export default function TopicItemSkeleton() {
  return (
    <Card className="my-5">
      <CardHeader className="hover:underline hover:cursor-pointer flex items-center gap-2 flex-row text-[16px] font-bold">
        <Leaf className="text-green-500" />
        <Label className="w-full d-block">
          <Skeleton className="md:w-[50%] w-full h-8" />
        </Label>
      </CardHeader>
      <CardContent>
        <Label className="w-full">
          <Skeleton className="w-full h-8" />
        </Label>
        <div className="flex gap-3 items-center mt-3">
          <Calendar className="w-[16px]" />-
          <div className="flex w-100 items-center gap-2">
            <Skeleton className="w-[80px] h-8" /> -
            <Skeleton className="w-[80px] h-8" />
          </div>
        </div>
        <div className="flex gap-3 items-center mt-3">
          <Users className="w-[16px]" />-
          <Label className="w-full d-block">
            <Skeleton className="w-[100px] h-8" />
          </Label>
        </div>
      </CardContent>
    </Card>
  )
}
