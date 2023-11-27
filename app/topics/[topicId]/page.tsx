import getTopicById from '@/actions/admin/topics/getTopicById'
import TopicDetail from '@/components/topic/TopicDetail'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Topic',
}

type Props = {
  params: {
    topicId: string
  }
}

export default async function TopicDetailPage(props: Props) {
  const {
    params: { topicId },
  } = props
  const savedTopic = await getTopicById(topicId)

  if (!savedTopic) {
    throw new Error('Something went wrong, please try again or later!')
  }

  return (
    <div className="w-full min-h-screen mt-[100px]">
      <TopicDetail topic={savedTopic} />
    </div>
  )
}
