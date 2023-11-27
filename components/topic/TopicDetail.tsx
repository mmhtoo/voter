'use client'
import { MDXEditor } from '@mdxeditor/editor'
import { Label } from '../ui/label'
import { useEffect, useState } from 'react'

export default function TopicDetail({ topic }: { topic: Topics }) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <div className="p-10">
      <Label className="text-[24px]">
        <h1>{topic.name}</h1>
      </Label>
      <div className="w-full md:w-[700px] h-[300px] bg-blue-100 mt-2"></div>
      <div className="mt-3 w-full md:w-[700px]">
        {isClient && <MDXEditor markdown={topic.description} readOnly={true} />}
      </div>
    </div>
  )
}
