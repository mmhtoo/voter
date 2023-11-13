import { UserIcon, PlusSquare, LeafyGreen, PackagePlus } from 'lucide-react'
import { Card, CardHeader, CardContent } from '../ui/card'
import getDashboardData from '@/actions/admin/getDashboardData'

export default async function DashboardCards() {
  const { users, activeTopics, totalTopics } = await getDashboardData()
  return (
    <div className="min-w-full grid sm:grid-cols-2 grid-rows-2  lg:grid-cols-4 gap-3">
      <Card className="h-32">
        <CardHeader>
          <div className="flex gap-2 items-center">
            <UserIcon className="text-purple-500" />
            <span>All Users</span>
          </div>
        </CardHeader>
        <CardContent className="flex justify-between items-center">
          <span>{users}</span>
        </CardContent>
      </Card>
      <Card className="h-32 ">
        <CardHeader>
          <div className="flex gap-2 items-center">
            <PlusSquare className="text-red-500" />
            <span>Total Topics</span>
          </div>
        </CardHeader>
        <CardContent>{totalTopics}</CardContent>
      </Card>
      <Card className="h-32">
        <CardHeader>
          <div className="flex gap-2 items-center">
            <LeafyGreen className="text-green-500" />
            <span>Active Topics</span>
          </div>
        </CardHeader>
        <CardContent>{activeTopics}</CardContent>
      </Card>
      <Card className="h-32">
        <CardHeader>
          <div className="flex gap-2 items-center">
            <PackagePlus className="text-orange-500" />
            <span>New Point Requests</span>
          </div>
        </CardHeader>
        <CardContent>0</CardContent>
      </Card>
    </div>
  )
}
