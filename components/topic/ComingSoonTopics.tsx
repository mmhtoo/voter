import getComingSoonTopicsForHomePage from '@/actions/topic/getComingSoonTopicsForHomePage'
import TopicItem from './TopicItem'
import { Label } from '../ui/label'
import { Clock } from 'lucide-react'

export default async function ComingSoonTopics() {
  const topics = await getComingSoonTopicsForHomePage()

  return (
    <>
      {topics.length > 0 && (
        <Label className="text-[28px]  flex items-center gap-2 ml-[16px] text-red-500">
          <Clock /> Coming Soon Contests
        </Label>
      )}
      {topics.map((topic) => {
        return <TopicItem key={topic.id} {...topic} />
      })}
    </>
  )
}
