import DashboardCards from '@/components/admin/dashboard-cards'
import DashboardCardsSkeleton from '@/components/admin/dashboard-cards-skeleton'
import { Metadata } from 'next'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: 'Dashboard',
}

export default function DashboardHomePage() {
  return (
    <div
      className={'w-100 min-h-screen mt-[72px] p-5 flex align-items-center '}>
      <Suspense fallback={<DashboardCardsSkeleton />}>
        <DashboardCards />
      </Suspense>
    </div>
  )
}
