'use client'
import deleteTopicById from '@/actions/admin/topics/deleteTopic'
import {
  AlertDialog,
  AlertDialogAction,
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
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useToast } from '@/components/ui/use-toast'
import { cn } from '@/libs/utils'
import { format } from 'date-fns'
import { EditIcon, ShieldAlert, Trash, Users } from 'lucide-react'
import Link from 'next/link'
import { useRef, useState } from 'react'
import ContestantsModal from './contestants-modal'

export default function TopicsTable({ topics }: { topics: Topics[] }) {
  const confirmModalRef = useRef<HTMLButtonElement | null>(null)
  const [topicToBeDelete, setTopicToBeDelete] = useState<string>()
  const [isDeleting, setIsDeleting] = useState(false)
  const { toast } = useToast()
  const [contestantsModal, setContestantsModal] = useState<{
    show: boolean
    topicId?: string
  }>({
    show: false,
    topicId: '',
  })

  const onDeleteTopic = () => {
    if (!topicToBeDelete) return
    setIsDeleting(true)
    deleteTopicById(topicToBeDelete).then((res) => {
      setIsDeleting(false)
      if (res.status != 'Success') {
        toast({
          description: res.message,
        })
        return
      }
      toast({
        description: res.message,
      })
    })
  }

  const isDeleteAble = (fromDate: Date, toDate: Date) => {
    const today = new Date(Date.now())
    if ((fromDate as Date) <= today && (toDate as Date) >= today) {
      return false
    }
    return true
  }

  return (
    <>
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
                <span>{topic.points_per_vote.toLocaleString()}</span>
              </TableCell>
              <TableCell className="py-1 mb-1">
                {format(topic.from_date as Date, 'dd-MM-yyyy HH:mm:ss')}
              </TableCell>
              <TableCell className="py-1 mb-1">
                {format(topic.to_date as Date, 'dd-MM-yyyy HH:mm:ss')}
              </TableCell>
              <TableCell className="py-1 mb-1">
                {format(topic.created_date as Date, 'dd-MM-yyyy HH:mm:ss')}
              </TableCell>
              <TableCell className="py-1 mb-1">
                {topic.updated_date
                  ? format(topic.updated_date as Date, 'dd-MM-yyyy HH:mm:ss')
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
              <TableCell className="py-1 mb-1 flex items-center gap-2 justify-center">
                <Button
                  onClick={() => {
                    setContestantsModal({ show: true, topicId: topic.id })
                  }}
                  variant={'ghost'}
                  className="p-2">
                  <Users className="w-[16px] text-orange-500" />
                </Button>
                <Link href={`/admin/dashboard/topics/${topic.id}`}>
                  <Button variant={'ghost'} className="p-2">
                    <EditIcon className="w-[16px] text-yellow-500" />
                  </Button>
                </Link>
                <Button
                  onClick={() => {
                    if (isDeleting) return
                    if (
                      !isDeleteAble(
                        topic.from_date as Date,
                        topic.to_date as Date
                      )
                    ) {
                      toast({
                        description:
                          'You cannot delete currently active topic!',
                        variant: 'destructive',
                      })
                      return
                    }
                    confirmModalRef.current?.click()
                    setTopicToBeDelete(topic.id)
                  }}
                  variant={'ghost'}
                  className="p-2">
                  {isDeleteAble(
                    topic.from_date as Date,
                    topic.to_date as Date
                  ) ? (
                    <Trash className="text-red-500 w-[16px]" />
                  ) : (
                    <ShieldAlert className="text-green-500 w-[16px]" />
                  )}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <ContestantsModal
        topicId={contestantsModal.topicId}
        show={contestantsModal.show}
        onClose={() => setContestantsModal({ show: false, topicId: undefined })}
      />
      <AlertDialog>
        <AlertDialogTrigger ref={confirmModalRef}></AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader className="text-red-500">
            Are you sure to delete?
          </AlertDialogHeader>
          <AlertDialogDescription>
            You need to to be sure to this confirmations because this can't be
            undone after succeded!
          </AlertDialogDescription>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={onDeleteTopic}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
