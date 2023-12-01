import { useAuth } from '@clerk/nextjs'
import { Button } from './ui/button'
import { useCallback, useEffect, useState } from 'react'
import { getCustomerByClerkId } from '@/actions/customer/getCustomerByClerkId'
import { Skeleton } from './ui/skeleton'

export function CurrentPoint() {
  const { userId: clerkId } = useAuth()
  const [point, setPoint] = useState<number>(0)

  const fetchPoint = useCallback(async () => {
    if (!clerkId) return
    const appUser = await getCustomerByClerkId(clerkId!)
    setPoint(appUser.points)
  }, [clerkId])

  useEffect(() => {
    if (!clerkId) return
    fetchPoint()
  }, [clerkId])

  return (
    <>
      <Button className="hidden md:flex" variant={'outline'}>
        <span className="text-green-500"> {point} Points</span>
      </Button>
      <span className="md:hidden text-green-500 ">{point} Points</span>
    </>
  )
}

export function CurrentPointSkeleton() {
  return (
    <Button variant={'outline'} className="min-w-[100px]">
      <Skeleton className="w-100 h-8" />
    </Button>
  )
}
