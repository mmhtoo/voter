'use client'

import { CustomDateRangePicker } from '@/components/date-picker'
import { Card, CardHeader, CardContent } from '@/components/ui/card'
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { EditTopicForm, editTopicSchema } from '@/libs/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  MDXEditor,
  headingsPlugin,
  quotePlugin,
  listsPlugin,
  toolbarPlugin,
  UndoRedo,
  BoldItalicUnderlineToggles,
  BlockTypeSelect,
  MDXEditorMethods,
} from '@mdxeditor/editor'
import { Separator } from '@radix-ui/react-dropdown-menu'
import '@mdxeditor/editor/style.css'
import { LeafyGreen } from 'lucide-react'
import { FormProvider, useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { useCallback, useEffect, useRef, useState } from 'react'
import updateTopics from '@/actions/admin/topics/updateTopics'
import { useToast } from '@/components/ui/use-toast'
import { useRouter } from 'next/navigation'

type Props = {
  data: Topics
}

export default function TopicEditForm(props: Props) {
  const form = useForm<EditTopicForm>({
    resolver: zodResolver(editTopicSchema),
  })
  const {
    control,
    setValue,
    formState: { errors },
    watch,
    handleSubmit,
  } = form
  const [isLoading, setIsLoading] = useState(false)
  const editorRef = useRef<MDXEditorMethods | null>(null)
  const { toast } = useToast()
  const { push } = useRouter()

  const checkTwoObject = useCallback(
    (newForm: EditTopicForm) => {
      const oldForm = props.data
      if (oldForm.name == newForm.name) {
        return true
      }
      if (oldForm.description == newForm.description) {
        return true
      }
      if (oldForm.points_per_vote == Number(newForm.pointsPerVote)) {
        return true
      }
      if (oldForm.from_date == newForm.fromDate) {
        return true
      }
      if (oldForm.to_date == newForm.toDate) {
        return true
      }
      return false
    },
    [props.data]
  )

  const onSubmit = handleSubmit((formValue) => {
    if (checkTwoObject(formValue)) {
      toast({
        description: 'Nothing was updated!',
      })
      return push('/admin/dashboard/topics')
    }
    setIsLoading(true)

    updateTopics({
      ...formValue,
    })
      .then((res) => {
        setIsLoading(false)
        if (res.status != 'Success') {
          toast({
            description: res.message,
            variant: 'destructive',
          })
          return
        }
        toast({
          description: res.message,
        })
        push('/admin/dashboard/topics')
      })
      .catch((e) => {
        setIsLoading(false)
        toast({
          description: e.message,
          variant: 'destructive',
        })
      })
  })

  useEffect(() => {
    if (!props.data) return
    const form = props.data
    setValue('description', form.description)
    setValue('id', form.id)
    setValue('name', form.name)
    setValue('fromDate', form.created_date! as Date)
    setValue('toDate', form.to_date! as Date)
    setValue('pointsPerVote', form.points_per_vote.toString())
    setValue('imageName', form.image_name)
    editorRef.current && editorRef.current.setMarkdown(watch('description'))
  }, [])

  return (
    <div className="w-100 min-h-screen mt-[72px] p-5 flex justify-center">
      <Card className="mt-3 w-full md:w-[550px]">
        <CardHeader>
          <h1 className="flex items-center mb-2 ms-2 gap-2">
            <LeafyGreen className="text-green-500" />
            <span className="font-normal text-[18px]">Edit Topic</span>
          </h1>
          <Separator />
          <CardContent className="py-5">
            <FormProvider {...form}>
              <form onSubmit={onSubmit} className="flex flex-col gap-1">
                <FormField
                  control={control}
                  name={'name'}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Topic's name <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          aria-describedby="error-topic-name"
                          placeholder={"Enter topic's name"}
                          {...field}
                        />
                      </FormControl>
                      <Label
                        id="error-topic-name"
                        className="text-red-500 font-normal text-[12px]">
                        {errors.name?.message}
                      </Label>
                    </FormItem>
                  )}
                />
                <div className="mt-2 mb-2">
                  <FormLabel>
                    Description <span className="text-red-500">*</span>
                  </FormLabel>
                  <MDXEditor
                    ref={editorRef}
                    markdown={watch('description') || ''}
                    className="editor"
                    contentEditableClassName={
                      'max-h-[150px] min-h-[150px] editor overflow-scroll scroll-p-2 scroll-m-0 dark:text-zinc-50'
                    }
                    onChange={(val) => setValue('description', val)}
                    plugins={[
                      headingsPlugin(),
                      quotePlugin(),
                      listsPlugin(),

                      toolbarPlugin({
                        toolbarContents: () => (
                          <>
                            <UndoRedo />
                            <BoldItalicUnderlineToggles />
                            <BlockTypeSelect />
                          </>
                        ),
                      }),
                    ]}
                  />
                  <Label className="text-red-500 font-normal text-[12px]">
                    {errors.description?.message}
                  </Label>
                </div>
                <FormField
                  control={control}
                  name={'pointsPerVote'}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Required Points per One vote{' '}
                        <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type={'number'}
                          aria-describedby={'error-points'}
                          placeholder={'Enter required points per one vote'}
                          {...field}
                        />
                      </FormControl>
                      <Label
                        id="error-points"
                        className="text-red-500 font-normal text-[12px]">
                        {errors.pointsPerVote?.message}
                      </Label>
                    </FormItem>
                  )}
                />
                <div className="mb-2 mt-2">
                  <CustomDateRangePicker
                    from={watch('fromDate')}
                    to={watch('toDate')}
                    isRequired
                    label={'Start date to End date'}
                    placeholder={'Select a date range'}
                    numberOfMonths={2}
                    onSelect={(range) => {
                      setValue('fromDate', range?.from!)
                      setValue('toDate', range?.to!)
                    }}
                    error={`${
                      errors.fromDate?.message || errors.toDate?.message || ''
                    }`}
                  />
                </div>
                <div className="w-100 flex flex-col items-center gap-2 mt-2">
                  <Button disabled={isLoading} type="submit" className="w-full">
                    {isLoading ? 'Loading...' : 'Submit'}
                  </Button>
                </div>
              </form>
            </FormProvider>
          </CardContent>
        </CardHeader>
      </Card>
    </div>
  )
}
