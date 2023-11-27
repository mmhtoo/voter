import { Clock } from 'lucide-react'
import { Label } from '../ui/label'
import TopicItemSkeleton from './TopicItemSkeleton'

export default function ComingSoonTopicsSkeleton() {
  return (
    <>
      <Label className="text-[28px]  flex items-center gap-2 ml-[16px] text-red-500">
        <Clock /> Coming Soon Contests
      </Label>
      {new Array(5).fill(null).map((_, index) => {
        return <TopicItemSkeleton key={index} />
      })}
    </>
  )
}
