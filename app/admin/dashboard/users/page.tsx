import CustomersTable from '@/components/admin/customers/customers-table'
import CustomersTableSkeleton from '@/components/admin/customers/customers-table-skeleton'
import { Separator } from '@/components/ui/separator'
import { Users } from 'lucide-react'
import { Suspense } from 'react'

export default function DashboardUsersPage() {
  return (
    <div className={'w-100 min-h-screen mt-[72px] p-5 '}>
      <h1 className="flex gap-2 align-items-center sm:mt-[32px] ml-[16px] text-[18px] mb-3">
        <Users className="w-[24px] h-[24px] text-yellow-500" />
        All Customers
      </h1>
      <Separator />
      <div className="w-100">
        <Suspense fallback={<CustomersTableSkeleton />}>
          <CustomersTable />
        </Suspense>
      </div>
    </div>
  )
}
