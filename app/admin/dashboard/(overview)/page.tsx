import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dashboard',
}

export default function DashboardHomePage() {
  return (
    <div className={'w-100 h-[1000px] mt-[72px] p-5'}>
      <h1>Dasboard</h1>
    </div>
  )
}
