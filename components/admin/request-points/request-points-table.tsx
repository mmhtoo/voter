import getRequestPoints from '@/actions/admin/request-points/getRequestpoints'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { cn } from '@/libs/utils'
import { AlertCircle, Check, CheckCheck } from 'lucide-react'
import Image from 'next/image'

type Props = {
  page: number
  hasConfirmed: boolean
}

const SIZE_PER_PAGE = 10

export default async function RequestPointsTable(props: Props) {
  const { page, hasConfirmed } = props
  const requests = await getRequestPoints(page, SIZE_PER_PAGE, '', hasConfirmed)

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
          <TableHead
            className={cn({
              hidden: hasConfirmed,
            })}>
            Actions
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {requests.map((request, index) => {
          return (
            <TableRow>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{request.request_id}</TableCell>
              <TableCell>{request.username}</TableCell>
              <TableCell>{request.email}</TableCell>
              <TableCell>
                <div className="w-[100px] h-[100px] relative bg-slate-400">
                  <Image
                    className="hover:opacity-50"
                    src={request.screenshoot_image}
                    alt={'screenshot'}
                    fill
                  />
                </div>
              </TableCell>
              <TableCell>{request.account_number || request.phone}</TableCell>
              <TableCell>{request.payment_name}</TableCell>
              <TableCell className="text-yellow-500">
                {request.point.toLocaleString()}
              </TableCell>
              <TableCell className="text-yellow-500">
                {request.amount.toLocaleString()} {' MMK'}
              </TableCell>
              <TableCell>
                {request.has_confirmed ? (
                  <CheckCheck className="text-green-500" />
                ) : (
                  <AlertCircle className="text-red-500" />
                )}
              </TableCell>
              <TableCell className={cn({ hidden: hasConfirmed })}>
                <Button variant={'outline'}>
                  <Check className="text-green-500" />
                </Button>
              </TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}
