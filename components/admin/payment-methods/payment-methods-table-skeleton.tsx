import { Skeleton } from '@/components/ui/skeleton'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

export default function PaymentMethodsTableSkeleton() {
  return (
    <Table>
      <TableCaption>Payment Methods Table</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Id</TableHead>
          <TableHead>Payment's Name</TableHead>
          <TableHead>Phone Number</TableHead>
          <TableHead>Account Number</TableHead>
          <TableHead>Created At</TableHead>
          <TableHead>Updated At</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {new Array(5).fill(null).map((_, index) => {
          return (
            <TableRow key={index}>
              <TableCell>
                <Skeleton className="w-[80px] h-8" />
              </TableCell>
              <TableCell>
                <Skeleton className="w-[200px] h-8" />
              </TableCell>
              <TableCell>
                <Skeleton className="w-[250px] h-8" />
              </TableCell>
              <TableCell>
                <Skeleton className="w-[250px] h-8" />
              </TableCell>
              <TableCell>
                <Skeleton className="w-[250px] h-8" />
              </TableCell>
              <TableCell></TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}
