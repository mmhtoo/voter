import getPricingData from '@/actions/admin/pricings/getPricingsData'
import { Button } from '@/components/ui/button'
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
  TableCaption,
} from '@/components/ui/table'
import { format } from 'date-fns'
import { EditIcon } from 'lucide-react'

export default async function PricingsTable() {
  const pricings = await getPricingData()

  return (
    <Table>
      <TableCaption>Pricings List Table</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Id</TableHead>
          <TableHead>Point</TableHead>
          <TableHead>Amount (MMK)</TableHead>
          <TableHead>Created Date</TableHead>
          <TableHead>Updated Date</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {pricings.map((pricing) => {
          return (
            <TableRow>
              <TableCell>{pricing.id}</TableCell>
              <TableCell className="text-yellow-500">{pricing.point}</TableCell>
              <TableCell className="text-yellow-500">
                {pricing.amount.toLocaleString() + ' MMK'}
              </TableCell>
              <TableCell>
                {format(pricing.created_at as Date, 'dd-mm-yyyy hh:mm:ss')}
              </TableCell>
              <TableCell>
                {pricing.updated_at
                  ? format(pricing.updated_at as Date, 'dd-mm-yyyy hh:mm:ss')
                  : '-'}
              </TableCell>
              <TableCell className="py-1 mb-1">
                <Button variant={'ghost'} className="p-1">
                  <EditIcon className="w-[16px] text-yellow-500" />
                </Button>
              </TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}
