import getRequestPoints from '@/actions/admin/request-points/getRequestpoints'
import RequestPointsTable from './request-points-table'

type Props = {
  page: number
  hasConfirmed: boolean
}

export default async function RequestPointsTableWrapper(props: Props) {
  const { page, hasConfirmed } = props
  const data = await getRequestPoints(page, 1, '', hasConfirmed)

  return <RequestPointsTable data={data} hasConfirmed={hasConfirmed} />
}
