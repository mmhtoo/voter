import TopicsTable from './topics-table'
import getAllTopics, {
  getTotalTopicsPageNumber,
} from '@/actions/topic/getAllTopics'
import Pagination from '@/components/Pagination'

export default async function TopicsTableWrapper(props: { page?: number }) {
  const { page = 1 } = props
  const topics = await getAllTopics(page, 10)
  const totalPage = await getTotalTopicsPageNumber(10)
  return (
    <>
      <TopicsTable topics={topics} />
      <div className={'w-full mt-[16px] flex justify-center'}>
        <Pagination
          currentPage={page}
          totalPage={totalPage}
          targetUrl={'/admin/dashboard/topics'}
        />
      </div>
    </>
  )
}
