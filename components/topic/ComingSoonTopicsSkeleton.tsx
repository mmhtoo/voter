import TopicItemSkeleton from './TopicItemSkeleton'

export default function ComingSoonTopicsSkeleton() {
  return new Array(5).fill(null).map((_, index) => {
    return <TopicItemSkeleton key={index} />
  })
}
