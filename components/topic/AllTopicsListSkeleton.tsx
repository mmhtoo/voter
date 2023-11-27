import TopicItemSkeleton from './TopicItemSkeleton'

export default function AllTopicListSkeleton() {
  return (
    <div className="w-100">
      {new Array(5).fill(null).map((_, index) => {
        return <TopicItemSkeleton key={index} />
      })}
    </div>
  )
}
