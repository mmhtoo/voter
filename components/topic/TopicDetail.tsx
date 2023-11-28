'use client'
import {
  MDXEditor,
  headingsPlugin,
  listsPlugin,
  quotePlugin,
} from '@mdxeditor/editor'
import { Label } from '../ui/label'
import { useEffect, useState } from 'react'
import Image from 'next/image'

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
      <div className="w-full md:w-[700px] max-h-[400px] h-[300px] md:h-[400px] bg-blue-100 mt-2 relative my-[32px]">
        <Image
          src={topic.image_name}
          alt={`${topic.name}'s image`}
          style={{
            width: '100%',
            height: '100%',
          }}
          className="rounded-md"
          fill
        />
      </div>
      <div className="mt-3 w-full md:w-[700px]">
        {isClient && (
          <MDXEditor
            plugins={[
              headingsPlugin(),
              quotePlugin(),
              listsPlugin(),
              headingsPlugin(),
            ]}
            markdown={topic.description}
            readOnly={true}
          />
        )}
      </div>
    </div>
  )
}
