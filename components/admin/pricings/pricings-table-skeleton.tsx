import { Skeleton } from '@/components/ui/skeleton'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

export default function PricingsTableSkeleton() {
  return (
    <Table>
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
        {new Array(5).fill(null).map((_, index) => (
          <TableRow key={index}>
            <TableCell>
              <Skeleton className="w-[80px] h-10" />
            </TableCell>
            <TableCell>
              <Skeleton className="w-[80px] h-10" />
            </TableCell>
            <TableCell>
              <Skeleton className="w-[80px] h-10" />
            </TableCell>
            <TableCell>
              <Skeleton className="w-[80px] h-10" />
            </TableCell>
            <TableCell>
              <Skeleton className="w-[80px] h-10" />
            </TableCell>
            <TableCell>
              <Skeleton className="w-[80px] h-10" />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
