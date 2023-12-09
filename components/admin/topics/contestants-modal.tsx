import getContestantsByTopicId from '@/actions/admin/contestants/getContestantsByTopicId'
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
} from '@/components/ui/alert-dialog'
import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Label } from '@radix-ui/react-dropdown-menu'
import Image from 'next/image'
import { Suspense, use } from 'react'

export default function ContestantsModal(props: {
  show: boolean
  topicId?: string
  onClose: () => void
}) {
  return (
    <AlertDialog open={props.show}>
      <AlertDialogContent>
        <AlertDialogHeader className="text-[24px] text-green-500">
          Contestant Lists
        </AlertDialogHeader>
        <AlertDialogDescription>
          <Suspense fallback={<ContestantsListSkeleton />}>
            <ContestantsList topicId={props.topicId} />
          </Suspense>
        </AlertDialogDescription>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={props.onClose}>Close</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

function ContestantsList(props: { topicId?: string }) {
  const contestants = use(getContestantsByTopicId(props.topicId!))

  return (
    <ul className=" max-h-[400px] overflow-scroll">
      {contestants.map((item) => {
        return (
          <li key={item.id}>
            <Contestant data={item} />
          </li>
        )
      })}
      {contestants.length == 0 && (
        <li className="flex justify-center items-center">
          <Label>No contestants </Label>
        </li>
      )}
    </ul>
  )
}

function Contestant(props: { data: Contestant }) {
  const { id, image_name, name, description, vote_count } = props.data
  return (
    <Card className="mb-[16px] pt-[16px]">
      <CardContent>
        <div className="w-full flex items-center gap-5">
          <div
            className={
              'w-[200px] h-[150px] rounded-sm relative overflow-hidden'
            }>
            <Image src={image_name} alt={id} fill={true} />
          </div>
          <div className="flex flex-col gap-3">
            <div>
              <Label className="font-bold">Name</Label>
              <Label>{name}</Label>
            </div>
            <div>
              <Label className="font-bold">Description</Label>
              <Label>{description}</Label>
            </div>
            <div>
              <Label className="font-bold">Total Vote</Label>
              <Label>{vote_count}</Label>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function ContestantsListSkeleton() {
  return (
    <ul className=" max-h-[400px] overflow-scroll">
      {new Array(2).fill(null).map((_, index) => {
        return (
          <li key={index}>
            <Card className="mb-[16px] pt-[16px]">
              <CardContent>
                <div className="w-full flex items-center gap-5">
                  <div
                    className={
                      'w-[200px] h-[150px] rounded-sm relative overflow-hidden'
                    }>
                    <Skeleton className="w-full h-full" />
                  </div>
                  <div className="flex flex-col gap-3">
                    <div>
                      <Label className="font-bold">Name</Label>
                      <Label className="block w-full">
                        <Skeleton className="w-100 h-8" />
                      </Label>
                    </div>
                    <div>
                      <Label className="font-bold">Description</Label>
                      <Label className="block w-full">
                        <Skeleton className="w-100 h-8" />
                      </Label>
                    </div>
                    <div>
                      <Label className="font-bold">Total Vote</Label>
                      <Label className="block w-full">
                        <Skeleton className="w-100 h-8" />
                      </Label>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </li>
        )
      })}
    </ul>
  )
}
