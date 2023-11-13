import { Skeleton } from '@/components/ui/skeleton'
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

export default function TopicsTableSkeleton() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableCell>Id</TableCell>
          <TableCell>Topics's name</TableCell>
          <TableCell>Description</TableCell>
          <TableCell>Required Point per Vote</TableCell>
          <TableCell>From Date</TableCell>
          <TableCell>To Date</TableCell>
          <TableCell>Created At</TableCell>
          <TableCell>Updated At</TableCell>
          <TableCell>Status</TableCell>
          <TableCell>Actions</TableCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        {new Array(5).fill(null).map((_, index) => (
          <TableRow key={index}>
            <TableCell className=" my-2">
              <Skeleton className={'w-[80px] h-10'} />
            </TableCell>
            <TableCell className="py-1 mb-1">
              <Skeleton className={'w-[80px] h-10'} />
            </TableCell>
            <TableCell className="py-1 mb-1">
              <Skeleton className={'w-[100px] h-10'} />
            </TableCell>
            <TableCell className="py-1 mb-1">
              <Skeleton className={'w-[80px] h-10'} />
            </TableCell>
            <TableCell className="py-1 mb-1">
              <Skeleton className={'w-[80px] h-10'} />
            </TableCell>
            <TableCell className="py-1 mb-1">
              <Skeleton className={'w-[80px] h-10'} />
            </TableCell>
            <TableCell className="py-1 mb-1">
              <Skeleton className={'w-[80px] h-10'} />
            </TableCell>
            <TableCell className="py-1 mb-1">
              <Skeleton className={'w-[80px] h-10'} />
            </TableCell>
            <TableCell className="py-1 mb-1">
              <Skeleton className={'w-[80px] h-10'} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
