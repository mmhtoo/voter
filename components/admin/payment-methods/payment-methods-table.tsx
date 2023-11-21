'use client'

import deletePaymentMethod from '@/actions/admin/payment-methods/deletePaymentMethod'
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useToast } from '@/components/ui/use-toast'
import { formatAccountSpacing } from '@/libs/utils'
import { format } from 'date-fns'
import { Edit, Trash } from 'lucide-react'
import { useRef, useState } from 'react'
import EditPaymentMethodModal from './edit-payment-method-modal'

type Props = {
  methods: PaymentMethod[]
}

export default function PaymentMethodsTable(props: Props) {
  const confirmModalShowBtnRef = useRef<HTMLButtonElement | null>(null)
  const cancelModalBtnRef = useRef<HTMLButtonElement | null>(null)
  const paymentToBeDeleteRef = useRef<number | null>()
  const [isDeleting, setIsDeleting] = useState(false)
  const { toast } = useToast()
  const editModalRef = useRef<HTMLButtonElement | null>(null)
  const [editData, setEditData] = useState<PaymentMethod>()

  const onDeleteConfirm = () => {
    if (!paymentToBeDeleteRef.current) return
    setIsDeleting(true)
    deletePaymentMethod(paymentToBeDeleteRef.current).then((res) => {
      setIsDeleting(false)
      if (res.status != 'Success') {
        return toast({
          description: res.message,
          variant: 'destructive',
        })
      }
      toast({
        description: res.message,
      })
      cancelModalBtnRef.current?.click()
    })
  }

  return (
    <>
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
                <TableCell className="flex items-center justify-center gap-2">
                  <Button
                    onClick={() => {
                      setEditData(method)
                      editModalRef.current?.click()
                    }}
                    variant={'ghost'}
                    className="p-1">
                    <Edit className="w-[16px] text-yellow-500" />
                  </Button>
                  <Button
                    onClick={() => {
                      if (method.cash_in_count > 0) {
                        return toast({
                          description:
                            'You cannot delete payment method that is having references in other Transactions!',
                          variant: 'destructive',
                        })
                      }
                      paymentToBeDeleteRef.current = method.id
                      confirmModalShowBtnRef.current?.click()
                    }}
                    variant={'ghost'}
                    className="p-1">
                    <Trash className="w-[16px] text-red-500" />
                  </Button>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
      <AlertDialog>
        <AlertDialogTrigger ref={confirmModalShowBtnRef}></AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader className="text-red-500 text-lg">
            Are you sure to delete?
          </AlertDialogHeader>
          <AlertDialogDescription>
            Please make sure to confirm before you delete because you can not
            undo after deleted!
          </AlertDialogDescription>
          <AlertDialogFooter>
            <AlertDialogCancel ref={cancelModalBtnRef}>
              Cancel
            </AlertDialogCancel>
            <Button disabled={isDeleting} onClick={onDeleteConfirm}>
              {isDeleting ? 'Deleting...' : 'Yes'}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <EditPaymentMethodModal
        buttonRef={editModalRef}
        target={editData?.account_number ? 'account' : 'phone'}
        name={editData?.name!}
        accountNumber={editData?.account_number}
        phone={editData?.phone}
        id={editData?.id!}
      />
    </>
  )
}
