'use client'

import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'

export default function ErrorPage(props: ErrorPageProps) {
  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center gap-3">
      <Label className={'text-red-500'}>{props.error.message}</Label>
      <Button variant={'ghost'} onClick={() => props.reset()}>
        Try again
      </Button>
    </div>
  )
}
