import TopicEditFormSkeleton from '@/components/admin/topics/topic-edit-form-skeleeton'
import TopicEditFormWrapper from '@/components/admin/topics/topic-edit-form-wrapper'
import { Suspense } from 'react'

type Props = {
  params: {
    topicId: string
  }
}

export default async function TopicEditPage(props: Props) {
  return (
    <Suspense fallback={<TopicEditFormSkeleton />}>
      <TopicEditFormWrapper topicId={props.params.topicId} />
    </Suspense>
  )
}
