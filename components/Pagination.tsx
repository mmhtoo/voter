'use client'
import { cn } from '@/libs/utils'
import { Label } from './ui/label'
import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

type Props = {
  totalPage: number
  currentPage: number
  targetUrl: string
}

const Breaker = () => {
  return (
    <Label
      className={cn(
        'py-2 px-4 text-white border-l-[1px] bg-black text-[16px] dark:bg-zinc-900 hover:opacity-70'
      )}>
      {'...'}
    </Label>
  )
}

export default function Pagination(param: Props) {
  const { totalPage, currentPage, targetUrl } = param
  const [_isClient, setIsClient] = useState(false)
  const searchParams = useSearchParams()
  const { push } = useRouter()
  let isDoneBreaker = false

  const goToPage = (page: number) => {
    const params = new URLSearchParams(searchParams)
    params.set('page', page.toString())
    push(`${targetUrl}?${params.toString()}`)
  }

  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <div className="w-full flex h-[100px] items-center justify-center">
      <div className="rounded-md overflow-hidden  border-white shadow flex">
        <Label
          onClick={() => {
            if (currentPage == 1) return
            goToPage(currentPage - 1)
          }}
          aria-disabled={currentPage == 1}
          className={cn(
            'py-2 px-4 text-white bg-zinc-900 text-[16px]  border-r-[1px]',
            'disabled:opacity-70'
          )}>
          {'<'}
        </Label>
        {new Array(totalPage).fill(null).map((_, index) => {
          const target = index + 1
          const curPage = Number(currentPage)
          // for last 3 items
          if (totalPage - target <= 2 && totalPage > 3) {
            if (!isDoneBreaker) {
              isDoneBreaker = true
              return <Breaker />
            }
            return (
              <Label
                onClick={() => {
                  if (curPage == target) return
                  goToPage(target)
                }}
                className={cn(
                  'py-2 px-4 text-white  bg-zinc-900 text-[16px] hover:opacity-70',
                  {
                    'border-l-[1px]': index != 0,
                    'text-red-500 dark:text-red-500': target == currentPage,
                  }
                )}>
                {target}
              </Label>
            )
          }
          // for around current page item
          // e.g if current page is 2
          // will run 1 and 2 and 3
          if (
            target == curPage ||
            target == curPage - 1 ||
            target == curPage + 1
          ) {
            isDoneBreaker = false
            return (
              <Label
                onClick={() => {
                  if (curPage == target) return
                  goToPage(target)
                }}
                className={cn(
                  'py-2 px-4 text-white  bg-zinc-900 text-[16px] hover:opacity-70',
                  {
                    'border-l-[1px]': index != 0,
                    'text-red-500 dark:text-red-500': target == currentPage,
                  }
                )}>
                {target}
              </Label>
            )
          } else {
            if (!isDoneBreaker) {
              isDoneBreaker = true
              return <Breaker />
            }
            return null
          }
        })}
        <Label
          onClick={() => {
            if (currentPage == totalPage) return
            goToPage(Number(currentPage) + 1)
          }}
          aria-disabled={currentPage == totalPage}
          className={cn(
            'py-2 px-4 text-white bg-zinc-900  text-[16px]  border-l-[1px]',
            'disabled:opacity-70'
          )}>
          {'>'}
        </Label>
      </div>
    </div>
  )
}
