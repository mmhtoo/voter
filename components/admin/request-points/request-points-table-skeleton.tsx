import { Skeleton } from '@/components/ui/skeleton'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

export default function RequestPointTableSkeleton() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>No</TableHead>
          <TableHead>Request Id</TableHead>
          <TableHead>Username</TableHead>
          <TableHead>Email Address</TableHead>
          <TableHead>Screenshot</TableHead>
          <TableHead>Transaction Account</TableHead>
          <TableHead>Payment Method Name</TableHead>
          <TableHead>Request Point</TableHead>
          <TableHead>Total Charges</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {new Array(5).fill(null).map((_, index) => {
          return (
            <TableRow key={index}>
              <TableCell>
                <Skeleton className="w-[50px] h-8" />
              </TableCell>
              <TableCell>
                <Skeleton className="w-[50px] h-8" />
              </TableCell>
              <TableCell>
                <Skeleton className="w-[100px] h-8" />
              </TableCell>
              <TableCell>
                <Skeleton className="w-[100px] h-8" />
              </TableCell>
              <TableCell>
                <div className="w-[100px] h-[100px] relative">
                  <Skeleton className="w-[100px] h-[100px]" />
                </div>
              </TableCell>
              <TableCell>
                <Skeleton className={'w-[130px] h-8'} />
              </TableCell>
              <TableCell>
                <Skeleton className={'w-[100px] h-8'} />
              </TableCell>
              <TableCell className="text-yellow-500">
                <Skeleton className={'w-[100px] h-8'} />
              </TableCell>
              <TableCell className="text-yellow-500">
                <Skeleton className={'w-[100px] h-8'} />
              </TableCell>
              <TableCell>
                <Skeleton className={'w-[50px] h-8'} />
              </TableCell>
              <TableCell>
                <Skeleton className={'w-[100px] h-8'} />
              </TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}
