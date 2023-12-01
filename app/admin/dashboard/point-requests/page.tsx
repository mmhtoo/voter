import { getRequestPointsTotalPage } from '@/actions/admin/request-points/getRequestpoints'
import Pagination from '@/components/Pagination'
import RequestPointTableSkeleton from '@/components/admin/request-points/request-points-table-skeleton'
import RequestPointsTableWrapper from '@/components/admin/request-points/request-points-table-wrapper'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/libs/utils'
import { Coins } from 'lucide-react'
import { Metadata } from 'next'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: 'Point Requests',
}

type Props = {
  params: {}
  searchParams: {
    page: number
    query: string
    hasConfirmed: boolean
  }
}

export default async function DashboardPointRequestsPage({
  searchParams: { page = 1, hasConfirmed = false },
}: Props) {
  const totalPage = await getRequestPointsTotalPage(1, hasConfirmed)

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
        <RequestPointsTableWrapper hasConfirmed={hasConfirmed} page={page} />
        <div className={cn({ hidden: totalPage < 2 })}>
          <Pagination
            currentPage={page}
            targetUrl={'/admin/dashboard/point-requests'}
            totalPage={totalPage}
          />
        </div>
      </Suspense>
    </div>
  )
}
