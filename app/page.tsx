import ComingSoonTopics from '@/components/topic/ComingSoonTopics'
import ComingSoonTopicsSkeleton from '@/components/topic/ComingSoonTopicsSkeleton'
import TopicItem from '@/components/topic/TopicItem'
import TopicItemSkeleton from '@/components/topic/TopicItemSkeleton'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Clock, Star } from 'lucide-react'
import { Metadata } from 'next'
import Link from 'next/link'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: 'Voter | Home',
}

export default function Home() {
  return (
    <div className="w-full min-h-screen mt-[64px]">
      <div className="w-full  h-screen mt-[100px] p-10">
        <Label>
          <h1 className="md:text-[120px] text-[64px] text-transparent bg-gradient-to-r bg-clip-text from-purple-400 to-pink-600">
            Welcome to Voter!
          </h1>
        </Label>
        <Label>
          <p
            className="mt-10 md:text-[32px] text-24px italic
           w-[90%] md:leading-10 leading-5">
            " Voter is a platform for giving votes to your idols in dedicated
            way and help your idols for winning in related contests! "
          </p>
        </Label>
        <div className="flex justify-end">
          <Link href={'/topics'}>
            <Button className="mt-[32px] w-[100px] md:mr-[128px]">
              Go Vote {'>'}{' '}
            </Button>
          </Link>
        </div>
      </div>
      <div className="mt-[10px] p-10 mb-[32px]">
        <Label className="text-[28px]  flex items-center gap-2 ml-[16px] text-red-500">
          <Star /> Recent Contests
        </Label>
        {/* <TopicItem /> */}
        <TopicItemSkeleton />
      </div>
      <div className="mt-[10px] p-10 mb-[32px]">
        <Label className="text-[28px]  flex items-center gap-2 ml-[16px] text-red-500">
          <Clock /> Coming Soon Contests
        </Label>
        <Suspense fallback={<ComingSoonTopicsSkeleton />}>
          <ComingSoonTopics />
        </Suspense>
      </div>
    </div>
  )
}
