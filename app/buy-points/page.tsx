import getAllPaymentMethods from '@/actions/admin/payment-methods/getAllPaymentMethods'
import getPricingData from '@/actions/admin/pricings/getPricingsData'
import BuyPointsForm from '@/components/buy-points/BuyPointsForm'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Buy Points',
}

export default async function BuyPointsPage() {
  const pricings = await getPricingData()
  const paymentMethods = await getAllPaymentMethods()

  return (
    <div className="w-full min-h-screen mt-[64px] flex justify-center items-center">
      <BuyPointsForm pricings={pricings} paymentMethods={paymentMethods} />
    </div>
  )
}
