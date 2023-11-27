import AllTopicsList from '@/components/topic/AllTopicsList'
import AllTopicListSkeleton from '@/components/topic/AllTopicsListSkeleton'
import { Label } from '@/components/ui/label'
import { Metadata } from 'next'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: 'Voter | Topics',
}

type Props = {
  params: {}
  searchParams: {
    page: number
    query: string
  }
}

export default async function PublicTopicsPage(props: Props) {
  const {
    searchParams: { page = 1 },
  } = props
  return (
    <div className="w-full min-h-screen mt-[64px] p-5">
      <Label className="text-[24px] ms-[32px] underline hover:cursor-pointer">
        <h1>All Topics</h1>
      </Label>
      <Suspense fallback={<AllTopicListSkeleton />}>
        <AllTopicsList page={page} />
      </Suspense>
    </div>
  )
}
