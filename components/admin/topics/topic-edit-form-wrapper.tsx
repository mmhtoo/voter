import TopicEditForm from './topic-edit-form'
import getTopicById from '@/actions/admin/topics/getTopicById'

export default async function TopicEditFormWrapper({
  topicId,
}: {
  topicId: string
}) {
  const savedTopic = await getTopicById(topicId)

  if (!savedTopic) {
    throw new Error('Something went wrong, please try again or later!')
  }

  return <TopicEditForm data={savedTopic} />
}
