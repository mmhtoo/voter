'use client'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { setPageTitle } from '@/libs/utils'
import '@mdxeditor/editor/style.css'
import { LeafyGreen } from 'lucide-react'
import { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import {
  MDXEditor,
  toolbarPlugin,
  headingsPlugin,
  quotePlugin,
  listsPlugin,
  UndoRedo,
  BoldItalicUnderlineToggles,
  BlockTypeSelect,
} from '@mdxeditor/editor'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { CustomDateRangePicker } from '@/components/date-picker'
import { zodResolver } from '@hookform/resolvers/zod'
import createNewTopic from '@/actions/admin/topics/createNewTopic'
import { useToast } from '@/components/ui/use-toast'
import { CreateTopicForm, createTopicSchema } from '@/libs/schemas'
import { useRouter } from 'next/navigation'

export default function NewTopicPage() {
  const form = useForm<CreateTopicForm>({
    resolver: zodResolver(createTopicSchema),
  })
  const { toast } = useToast()
  const { push } = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const {
    control,
    setValue,
    formState: { errors },
    handleSubmit,
    watch,
  } = form

  const onSubmit = handleSubmit((formValue) => {
    createNewTopic(formValue)
      .then((res) => {
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
        console.log(e)
        toast({
          description: e.message,
          variant: 'destructive',
        })
      })
  })

  useEffect(() => {
    setPageTitle('New Topic')
  }, [])

  return (
    <div className="w-100 min-h-screen mt-[72px] p-5 flex justify-center">
      <Card className="mt-3 w-full md:w-[550px]">
        <CardHeader>
          <h1 className="flex items-center mb-2 ms-2 gap-2">
            <LeafyGreen className="text-green-500" />
            <span className="font-normal text-[18px]">Create New Topic</span>
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
                    markdown={''}
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
