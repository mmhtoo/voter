import TopicsTableWrapper from '@/components/admin/topics/topic-table-wrapper'
import TopicsTableSkeleton from '@/components/admin/topics/topics-table-skeleton'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { LeafyGreen, PlusCircle } from 'lucide-react'
import { Metadata } from 'next'
import Link from 'next/link'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: 'Topics',
}

export default async function DashboardTopicsPage() {
  return (
    <div className={'w-100 min-h-screen mt-[72px] p-5 '}>
      <div className="flex items-center justify-between">
        <h1 className="flex gap-2 align-items-center sm:mt-[32px] ml-[16px] text-[18px] mb-3">
          <LeafyGreen className="w-[24px] h-[24px] text-green-500" />
          All Topics
        </h1>
        <Link href={'/admin/dashboard/topics/new'}>
          <Button
            variant={'secondary'}
            className={
              'flex items-center gap-2 mb-1 lg:mb-0 me-3 text-green-500'
            }>
            <PlusCircle />
            New
          </Button>
        </Link>
      </div>
      <Separator />
      <Suspense fallback={<TopicsTableSkeleton />}>
        <TopicsTableWrapper />
      </Suspense>
    </div>
  )
}
