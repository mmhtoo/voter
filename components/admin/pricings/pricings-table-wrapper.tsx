import getPricingData from '@/actions/admin/pricings/getPricingsData'
import PricingsTable from './pricings-table'

export default async function PricingsTableWrapper() {
  const pricings = await getPricingData()
  return <PricingsTable pricings={pricings} />
}
