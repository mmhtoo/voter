import DashboardHeader from '@/components/dashboard-header'
import { PropsWithChildren } from 'react'

export default function Layout(props: PropsWithChildren) {
  return (
    <div className="w-full min-h-screen relative">
      <DashboardHeader />
      {props.children}
    </div>
  )
}
