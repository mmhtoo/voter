import getCustomersData from '@/actions/admin/customers/getCustomersData'
import {
  TableCaption,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from '@/components/ui/table'
import { format } from 'date-fns'

export default async function CustomersTable() {
  const customers = await getCustomersData()

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
        {customers.map((customer) => {
          return (
            <TableRow key={customer.id}>
              <TableCell>{customer.id}</TableCell>
              <TableCell>{customer.username}</TableCell>
              <TableCell>{customer.email}</TableCell>
              <TableCell>{customer.phone || '-'}</TableCell>
              <TableCell>{customer.points}</TableCell>
              <TableCell>
                {format(customer.created_at as Date, 'dd-mm-yyyy hh:mm:ss')}
              </TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}
