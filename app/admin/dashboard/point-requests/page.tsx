import RequestPointsTable from '@/components/admin/request-points/request-points-table'
import RequestPointTableSkeleton from '@/components/admin/request-points/request-points-table-skeleton'
import { Separator } from '@/components/ui/separator'
import { Coins } from 'lucide-react'
import { Metadata } from 'next'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: 'Point Requests',
}

export default async function DashboardPointRequestsPage() {
  return (
    <div className={'w-100 min-h-screen mt-[72px] p-5 '}>
      <div className="flex items-center justify-between">
        <h1 className="flex gap-2 align-items-center sm:mt-[32px] ml-[16px] text-[18px] mb-3">
          <Coins className="w-[24px] h-[24px] text-green-500" />
          Customer Requests
        </h1>
      </div>
      <Separator />
      <Suspense fallback={<RequestPointTableSkeleton />}>
        <RequestPointsTable page={1} hasConfirmed={false} />
      </Suspense>
    </div>
  )
}
