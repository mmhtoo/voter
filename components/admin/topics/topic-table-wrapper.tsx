import getAllTopics from '@/actions/admin/topics/getAllTopics'
import TopicsTable from './topics-table'

export default async function TopicsTableWrapper() {
  const topics = await getAllTopics()
  return <TopicsTable topics={topics} />
}
