import { UserIcon, PlusSquare, LeafyGreen, PackagePlus } from 'lucide-react'
import { Card, CardHeader, CardContent } from '../ui/card'
import { Skeleton } from '../ui/skeleton'

export default function DashboardCardsSkeleton() {
  return (
    <div className="min-w-full grid grid-cols-4 gap-3">
      <Card className="h-32 ">
        <CardHeader>
          <div className="flex gap-2 items-center">
            <UserIcon className="text-purple-500" />
            <span>All Users</span>
          </div>
        </CardHeader>
        <CardContent>
          <Skeleton className="w-100 h-8" />
        </CardContent>
      </Card>
      <Card className="h-32 ">
        <CardHeader>
          <div className="flex gap-2 items-center">
            <PlusSquare className="text-red-500" />
            <span>Total Topics</span>
          </div>
        </CardHeader>
        <CardContent>
          <Skeleton className="w-100 h-8" />
        </CardContent>
      </Card>
      <Card className="h-32">
        <CardHeader>
          <div className="flex gap-2 items-center">
            <LeafyGreen className="text-green-500" />
            <span>Active Topics</span>
          </div>
        </CardHeader>
        <CardContent>
          <Skeleton className="w-100 h-8" />
        </CardContent>
      </Card>
      <Card className="h-32">
        <CardHeader>
          <div className="flex gap-2 items-center">
            <PackagePlus className="text-orange-500" />
            <span>New Point Requests</span>
          </div>
        </CardHeader>
        <CardContent>
          <Skeleton className="w-100 h-8" />
        </CardContent>
      </Card>
    </div>
  )
}
