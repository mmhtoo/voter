import getAllPaymentMethods from '@/actions/admin/payment-methods/getAllPaymentMethods'
import PaymentMethodsTable from './payment-methods-table'

export default async function PaymentMethodsTableWrapper() {
  const methods = await getAllPaymentMethods()
  return <PaymentMethodsTable methods={methods} />
}
