import { Skeleton } from '@/components/ui/skeleton'
import {
  TableCaption,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table'
import { Table } from 'lucide-react'

export default function CustomersTableSkeleton() {
  return (
    <Table>
      <TableCaption>Customer lists table for voter application.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Id</TableHead>
          <TableHead>Username</TableHead>
          <TableHead>Email Address</TableHead>
          <TableHead>Phone</TableHead>
          <TableHead>Points</TableHead>
          <TableHead>Joined From</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>
            <Skeleton className="w-[150px] h-10 mb-3" />
          </TableCell>
          <TableCell>
            <Skeleton className="w-[150px] h-10 mb-3" />
          </TableCell>
          <TableCell>
            <Skeleton className="w-[150px] h-10 mb-3" />
          </TableCell>
          <TableCell>
            <Skeleton className="w-[50px] h-10 mb-3" />
          </TableCell>
          <TableCell>
            <Skeleton className="w-[150px] h-10 mb-3" />
          </TableCell>
          <TableCell>
            <Skeleton className="w-[150px] h-10 mb-3" />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <Skeleton className="w-[150px] h-10 mb-3" />
          </TableCell>
          <TableCell>
            <Skeleton className="w-[150px] h-10 mb-3" />
          </TableCell>
          <TableCell>
            <Skeleton className="w-[150px] h-10 mb-3" />
          </TableCell>
          <TableCell>
            <Skeleton className="w-[50px] h-10 mb-3" />
          </TableCell>
          <TableCell>
            <Skeleton className="w-[150px] h-10 mb-3" />
          </TableCell>
          <TableCell>
            <Skeleton className="w-[150px] h-10 mb-3" />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <Skeleton className="w-[150px] h-10 mb-3" />
          </TableCell>
          <TableCell>
            <Skeleton className="w-[150px] h-10 mb-3" />
          </TableCell>
          <TableCell>
            <Skeleton className="w-[150px] h-10 mb-3" />
          </TableCell>
          <TableCell>
            <Skeleton className="w-[50px] h-10 mb-3" />
          </TableCell>
          <TableCell>
            <Skeleton className="w-[150px] h-10 mb-3" />
          </TableCell>
          <TableCell>
            <Skeleton className="w-[150px] h-10 mb-3" />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <Skeleton className="w-[150px] h-10 mb-3" />
          </TableCell>
          <TableCell>
            <Skeleton className="w-[150px] h-10 mb-3" />
          </TableCell>
          <TableCell>
            <Skeleton className="w-[150px] h-10 mb-3" />
          </TableCell>
          <TableCell>
            <Skeleton className="w-[50px] h-10 mb-3" />
          </TableCell>
          <TableCell>
            <Skeleton className="w-[150px] h-10 mb-3" />
          </TableCell>
          <TableCell>
            <Skeleton className="w-[150px] h-10 mb-3" />
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}
