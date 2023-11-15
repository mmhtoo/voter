import PricingsTable from '@/components/admin/pricings/pricings-table'
import PricingsTableSkeleton from '@/components/admin/pricings/pricings-table-skeleton'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Coins, PlusCircle } from 'lucide-react'
import { Metadata } from 'next'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: 'Pricings',
}

export default function PricingsPage() {
  return (
    <div className={'w-100 min-h-screen mt-[72px] p-5 '}>
      <div className="flex items-center justify-between">
        <h1 className="flex gap-2 align-items-center sm:mt-[32px] ml-[16px] text-[18px] mb-3">
          <Coins className="w-[24px] h-[24px] text-yellow-500" />
          Pricings
        </h1>
        <Button
          variant={'secondary'}
          className={'flex items-center gap-2 me-3 text-green-500'}>
          <PlusCircle />
          New
        </Button>
      </div>
      <Separator />
      <Suspense fallback={<PricingsTableSkeleton />}>
        <PricingsTable />
      </Suspense>
    </div>
  )
}
