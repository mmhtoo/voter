'use client'
import '@mdxeditor/editor/style.css'
import { MDXEditor, MDXEditorMethods, headingsPlugin } from '@mdxeditor/editor'
import dynamic from 'next/dynamic'
import { Suspense, createRef, useRef } from 'react'

const markdown = `
# Hello world!
Check the EditorComponent.tsx file for the code 

`

const EditorComp = dynamic(() => import('@/components/mdx-editor/Editor'), {
  ssr: false,
})

export default function NewTopicPage() {
  const ref = useRef<MDXEditorMethods>(null)

  return (
    <div className="w-100 min-h-screen mt-[72px] p-5 ">
      <h1>create topic page</h1>
      <div className="min-h-[500px]">
        <Suspense fallback={<h1>Loading</h1>}>
          <EditorComp editorRef={ref} markdown={markdown} />
        </Suspense>
      </div>
    </div>
  )
}
