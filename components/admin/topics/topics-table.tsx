import getAllTopics from '@/actions/admin/topics/getAllTopics'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { cn } from '@/libs/utils'
import { format } from 'date-fns'
import { EditIcon } from 'lucide-react'

export default async function TopicsTable() {
  const topics = await getAllTopics()
  return (
    <Table>
      <TableCaption>Topics List Table</TableCaption>
      <TableHeader>
        <TableRow>
          <TableCell className="w-[80px]">Id</TableCell>
          <TableCell>Topics's name</TableCell>
          <TableCell className="w-[200px]">Description</TableCell>
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
        {topics.map((topic) => (
          <TableRow key={topic.id}>
            <TableCell className=" my-2">
              <span className="line-clamp-1">{topic.id}</span>
            </TableCell>
            <TableCell className="py-1 mb-1">
              <span className={'line-clamp-2'}>{topic.name}</span>
            </TableCell>
            <TableCell className="py-1 mb-1">
              <span className="line-clamp-2">{topic.description}</span>
            </TableCell>
            <TableCell className="text-yellow-500">
              <span>{topic.points_per_vote}</span>
            </TableCell>
            <TableCell className="py-1 mb-1">
              {format(topic.from_date as Date, 'dd-mm-yyyy hh:mm:ss')}
            </TableCell>
            <TableCell className="py-1 mb-1">
              {format(topic.to_date as Date, 'dd-mm-yyyy hh:mm:ss')}
            </TableCell>
            <TableCell className="py-1 mb-1">
              {format(topic.created_date as Date, 'dd-mm-yyyy hh:mm:ss')}
            </TableCell>
            <TableCell className="py-1 mb-1">
              {topic.updated_date
                ? format(topic.updated_date as Date, 'dd-mm-yyyy hh:mm:ss')
                : '-'}
            </TableCell>
            <TableCell
              className={cn('p-1 mb-1 uppercase', {
                'text-yellow-500': topic.status == 'coming-soon',
                'text-green-500': topic.status == 'active',
                'text-red-500': topic.status == 'died',
              })}>
              {topic.status}
            </TableCell>
            <TableCell className="py-1 mb-1">
              <Button variant={'ghost'}>
                <EditIcon className="w-[16px] text-yellow-500" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
