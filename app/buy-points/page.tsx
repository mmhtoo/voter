import getPricingData from '@/actions/admin/pricings/getPricingsData'
import BuyPointsForm from '@/components/buy-points/BuyPointsForm'

export default async function BuyPointsPage() {
  const pricings = await getPricingData()

  return (
    <div className="w-full min-h-screen mt-[64px] flex justify-center items-center">
      <BuyPointsForm pricings={pricings} />
    </div>
  )
}
