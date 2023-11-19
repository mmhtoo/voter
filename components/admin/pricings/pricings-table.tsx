'use client'
import deletePricing from '@/actions/admin/pricings/deletePricing'
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
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
  TableCaption,
} from '@/components/ui/table'
import { useToast } from '@/components/ui/use-toast'
import { format } from 'date-fns'
import { EditIcon, TrashIcon } from 'lucide-react'
import { useRef, useState } from 'react'

export default function PricingsTable({ pricings }: { pricings: Pricing[] }) {
  const confirmModalBtnRef = useRef<HTMLButtonElement | null>(null)
  const cancelBtnRef = useRef<HTMLButtonElement | null>(null)
  const pricingToDeleteRef = useRef<string | null>(null)
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  const onPressDeleteConfirm = () => {
    if (!pricingToDeleteRef.current) return
    setIsLoading(true)
    deletePricing(pricingToDeleteRef.current).then((res) => {
      setIsLoading(false)
      if (res.status != 'Success') {
        toast({
          description: res.message,
          variant: 'destructive',
        })
        return
      }
      toast({
        description: res.message,
      })
      cancelBtnRef.current?.click()
    })
  }

  return (
    <>
      <Table>
        <TableCaption>Pricings List Table</TableCaption>
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
          {pricings.map((pricing) => {
            return (
              <TableRow>
                <TableCell>{pricing.id}</TableCell>
                <TableCell className="text-yellow-500">
                  {pricing.point}
                </TableCell>
                <TableCell className="text-yellow-500">
                  {pricing.amount.toLocaleString() + ' MMK'}
                </TableCell>
                <TableCell>
                  {format(pricing.created_at as Date, 'dd-mm-yyyy hh:mm:ss')}
                </TableCell>
                <TableCell>
                  {pricing.updated_at
                    ? format(pricing.updated_at as Date, 'dd-mm-yyyy hh:mm:ss')
                    : '-'}
                </TableCell>
                <TableCell className="py-1 mb-1 flex items-center justify-center gap-2">
                  <Button variant={'ghost'} className="p-1">
                    <EditIcon className="w-[16px] text-yellow-500" />
                  </Button>
                  <Button
                    onClick={() => {
                      if (pricing.sold_count > 0) {
                        toast({
                          description:
                            'You cannot delete pricing data that is having references in other Transactions!',
                          variant: 'destructive',
                        })
                        return
                      }
                      confirmModalBtnRef.current?.click()
                      pricingToDeleteRef.current = pricing.id
                    }}
                    variant={'ghost'}
                    className="p-1">
                    <TrashIcon className="w-[16px] text-red-500" />
                  </Button>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
      <AlertDialog>
        <AlertDialogTrigger ref={confirmModalBtnRef}></AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader className="text-red-500">
            Are you sure to delete?
          </AlertDialogHeader>
          <AlertDialogDescription>
            Please make sure to confirm before you delete because you cannot
            undone after succeeded!
          </AlertDialogDescription>
          <AlertDialogFooter>
            <AlertDialogCancel ref={cancelBtnRef}>Cancel</AlertDialogCancel>
            <Button disabled={isLoading} onClick={onPressDeleteConfirm}>
              {isLoading ? 'Loading...' : 'Yes'}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
