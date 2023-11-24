import getComingSoonTopicsForHomePage from '@/actions/topic/getComingSoonTopicsForHomePage'
import TopicItem from './TopicItem'

export default async function ComingSoonTopics() {
  const topics = await getComingSoonTopicsForHomePage()

  return topics.map((topic) => {
    return <TopicItem key={topic.id} {...topic} />
  })
}
