'use client'

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { formatAccountSpacing } from '@/libs/utils'
import { format } from 'date-fns'

type Props = {
  methods: PaymentMethod[]
}

export default function PaymentMethodsTable(props: Props) {
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
        {props.methods.map((method) => {
          return (
            <TableRow key={method.id}>
              <TableCell>{method.id}</TableCell>
              <TableCell>{method.name}</TableCell>
              <TableCell>{method.phone || '-'}</TableCell>
              <TableCell>
                {method.account_number
                  ? formatAccountSpacing(method.account_number)
                  : '-'}
              </TableCell>
              <TableCell>
                {format(method.created_at as Date, 'dd-mm-yyyy hh:mm:ss')}
              </TableCell>
              <TableCell>
                {method.updated_at
                  ? format(method.updated_at as Date, 'dd-mm-yyyy hh:mm:ss')
                  : '-'}
              </TableCell>
              <TableCell></TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}
