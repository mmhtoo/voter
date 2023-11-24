'use client'
import { ArrowRight, Calendar, Leaf, Users } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader } from '../ui/card'
import { MDXEditor } from '@mdxeditor/editor'
import { useEffect, useState } from 'react'
import { Label } from '../ui/label'
import { Button } from '../ui/button'
import { format } from 'date-fns'
import Link from 'next/link'

export default function TopicItem(props: Topics) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <Card className="my-5">
      <CardHeader className="hover:underline line-clamp-1 hover:cursor-pointer flex items-center gap-2 flex-row text-[16px] font-bold">
        <Leaf className="text-green-500" />
        <Link href={`/topics/${props.id}`}>{props.name}</Link>
      </CardHeader>
      <CardContent>
        {isClient && (
          <MDXEditor
            readOnly
            className="md:line-clamp-1 line-clamp-3"
            markdown={props.description}
          />
        )}
        <div className="flex gap-3 items-center mt-3">
          <Calendar className="w-[16px]" />-
          <div>
            {format(props.from_date as Date, 'yyyy MMM/do')} -{' '}
            {format(props.to_date as Date, 'yyyy MMM/do')}
          </div>
        </div>
        <div className="flex gap-3 items-center mt-3">
          <Users className="w-[16px]" />-<Label>8 Contestants</Label>
        </div>
        <div className="p-0 mt-2 flex items-center">
          <Button variant={'outline'}>
            Vote Now <ArrowRight />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
