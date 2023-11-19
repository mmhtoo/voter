import AddPaymentMethodModal from '@/components/admin/payment-methods/add-payment-method-modal'
import PaymentMethodsTableSkeleton from '@/components/admin/payment-methods/payment-methods-table-skeleton'
import PaymentMethodsTableWrapper from '@/components/admin/payment-methods/payment-methods-table-wrapper'
import { Separator } from '@/components/ui/separator'
import { DollarSign } from 'lucide-react'
import { Metadata } from 'next'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: 'Payment Methods',
}

export default function DashboardPaymentMethodsPage() {
  return (
    <div className={'w-100 min-h-screen mt-[72px] p-5 '}>
      <div className="flex items-center justify-between">
        <h1 className="flex gap-2 align-items-center sm:mt-[32px] ml-[16px] text-[18px] mb-3">
          <DollarSign className="w-[24px] h-[24px] text-yellow-500" />
          Payment Methods
        </h1>
        <AddPaymentMethodModal />
      </div>
      <Separator />
      <Suspense fallback={<PaymentMethodsTableSkeleton />}>
        <PaymentMethodsTableWrapper />
      </Suspense>
    </div>
  )
}
