import getAllTopics, {
  getTotalTopicsPageNumber,
} from '@/actions/topic/getAllTopics'
import TopicItem from './TopicItem'
import Pagination from '../Pagination'

const ITEMS_PER_PAGE = 5

export default async function AllTopicsList(props: { page: number }) {
  const { page = 1 } = props
  const totalPage = await getTotalTopicsPageNumber(ITEMS_PER_PAGE)
  const allTopics = await getAllTopics(page, ITEMS_PER_PAGE)

  return (
    <div className="w-100 min-h-screen mt-[16px]">
      {allTopics.map((topic) => {
        return <TopicItem {...topic} />
      })}
      <Pagination currentPage={page} totalPage={totalPage} />
    </div>
  )
}
