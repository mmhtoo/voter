'use client'
import updatePointData from '@/actions/admin/customers/updatePointData'
import confirmRequestPoint from '@/actions/admin/request-points/confirmRequestPoint'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useToast } from '@/components/ui/use-toast'
import { cn } from '@/libs/utils'
import { AlertCircle, CheckCheck } from 'lucide-react'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

type Props = {
  data: RequestPointsResult[]
  hasConfirmed: boolean
}

export default function RequestPointsTable(props: Props) {
  const { data, hasConfirmed } = props
  const [isClient, setIsClient] = useState(false)
  const [alertModal, setAlertModal] = useState<{
    show: boolean
    requestId: number | null
    userId: string | null
  }>({
    show: false,
    requestId: null,
    userId: null,
  })
  const [isConfirming, setIsConfirming] = useState(false)
  const [isSynchronizing, setIsSynchronizing] = useState(false)
  const { toast } = useToast()
  const { replace } = useRouter()
  const path = usePathname()

  const handleClickConfirm = () => {
    if (!alertModal.requestId || !alertModal.userId) return
    setIsConfirming(true)
    confirmRequestPoint(alertModal.requestId!)
      .then(async (res) => {
        setIsConfirming(false)
        toast({
          variant: res.status == 'Failed' ? 'destructive' : 'default',
          description: res.message,
        })
        setIsSynchronizing(true)
        const syncStatus = await updatePointData(
          alertModal.userId!,
          alertModal.requestId!,
          '+'
        )
        setIsSynchronizing(false)
        toast({
          variant: syncStatus.status == 'Failed' ? 'destructive' : 'default',
          description: syncStatus.message,
        })
        setAlertModal({ show: false, requestId: null, userId: null })
        replace(path)
      })
      .catch((e) => {
        setIsConfirming(false)
        setIsSynchronizing(false)
        return toast({
          description: (e as unknown as any).message,
          variant: 'destructive',
        })
      })
  }

  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <>
      {isClient && (
        <>
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
              {data.map((request, index) => {
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
                    <TableCell>
                      {request.account_number || request.phone}
                    </TableCell>
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
                      <Button
                        onClick={() =>
                          setAlertModal({
                            show: true,
                            requestId: request.request_id,
                            userId: request.user_id,
                          })
                        }
                        variant={'outline'}>
                        <CheckCheck className="text-green-500" />
                        Confirm
                      </Button>
                    </TableCell>
                  </TableRow>
                )
              })}
              {data.length == 0 && (
                <TableRow>
                  <TableCell colSpan={11} className="text-center opacity-90">
                    No request to show currently!
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          <AlertDialog open={alertModal.show}>
            <AlertDialogContent>
              <AlertDialogHeader className="text-red-500 text-[24px] ">
                Confirmation
              </AlertDialogHeader>
              <AlertDialogDescription>
                Are you sure to confirm this request, if you have confirmed, you
                won't be able to undo!
              </AlertDialogDescription>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleClickConfirm}
                  disabled={isConfirming}>
                  {isConfirming
                    ? 'Loading...'
                    : isSynchronizing
                    ? 'Synchronizing to user'
                    : 'Yes'}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </>
      )}
    </>
  )
}
