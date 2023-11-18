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
import { LeafyGreen } from 'lucide-react'
import { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import * as z from 'zod'
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
import { CustomDateRangePicker } from '@/components/date-picker'
import { schema } from './page'

export default function NewTopicPage() {
  const form = useForm<z.infer<typeof schema>>()
  const {
    control,
    watch,
    setValue,
    formState: { errors },
  } = form

  useEffect(() => {
    setPageTitle('New Topic')
  }, [])

  useEffect(() => {
    console.log(watch('description'))
  }, [watch('description')])

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
              <form className="flex flex-col gap-1">
                <FormField
                  control={control}
                  name={'name'}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Topic's name <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input placeholder={"Enter topic's name"} {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <div className="mt-2">
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
                </div>
                <div className="flex justify-start items-center gap-3 mt-3 mb-2">
                  <CustomDateRangePicker
                    label={'Start Date to End Date'}
                    placeholder={'Pick a date range'}
                    from={watch('fromDate')}
                    to={watch('toDate')}
                    onSelect={(range) => {
                      setValue('fromDate', range?.from!)
                      setValue('toDate', range?.to!)
                    }}
                    error={`${errors.fromDate?.message || ''} \n ${
                      errors.toDate?.message || ''
                    }`}
                    isRequired
                  />
                </div>
                <div />
              </form>
            </FormProvider>
          </CardContent>
        </CardHeader>
      </Card>
    </div>
  )
}
