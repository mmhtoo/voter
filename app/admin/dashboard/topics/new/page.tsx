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
import { setPageTitle, today } from '@/libs/utils'
import '@mdxeditor/editor/style.css'
import { LeafyGreen } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
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
import {
  CreateContestantFormType,
  CreateTopicForm,
  createContestantSchema,
  createTopicSchema,
} from '@/libs/schemas'
import { useRouter } from 'next/navigation'
import { v4 as uuidv4 } from 'uuid'
import { format } from 'date-fns'
import { upload } from '@vercel/blob/client'
import { ALLOWED_IMAGE_TYPES } from '@/libs/data/constants'
import CreateContestantForm from '@/components/admin/topics/create-contestant-form'
import saveContestants from '@/actions/admin/contestants/saveContestants'

export default function NewTopicPage() {
  const form = useForm<CreateTopicForm>({
    resolver: zodResolver(createTopicSchema),
  })
  const { toast } = useToast()
  const { push } = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [contestants, setContestants] = useState<
    (CreateContestantFormType & { file?: File })[]
  >([])
  const [contestantsError, setContestantsError] = useState<
    (CreateContestantFormType & { file: string })[]
  >([])

  const {
    control,
    setValue,
    formState: { errors },
    handleSubmit,
    watch,
    getValues,
    setError,
  } = form
  const imageRef = useRef<HTMLInputElement>(null)

  const onSubmit = handleSubmit(async (formValue) => {
    const file = imageRef.current?.files ? imageRef.current.files[0] : null
    if (!file) {
      setError('imageName', { message: 'Image is required!' })
      return
    }
    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
      setError('imageName', { message: 'Invalid image!' })
      return
    }

    // a topic should have minimum 2 contestants to be
    if (contestants.length < 2) {
      return toast({
        description: 'A topic should have mininum 2 contestants!',
        variant: 'destructive',
      })
    }

    let hasErrorInContestants = false
    const errors: (CreateContestantFormType & { file: string })[] = []
    const contestantNames: string[] = []
    contestants.forEach((contestant) => {
      const error: CreateContestantFormType & { file: string } = {
        name: '',
        image_name: '',
        description: '',
        file: '',
      }
      const targetIndex = contestantNames.findIndex(
        (item) => item == contestant.name
      )
      if (targetIndex != -1) {
        error.name = 'You have already added contestant with this name!'
        hasErrorInContestants = true
      }
      if (
        !contestant.name ||
        contestant.name.trim().length < 5 ||
        contestant.name.trim().length > 100
      ) {
        error.name = 'Minimum is 5 characters and maximum is 100 characters!'
        hasErrorInContestants = true
      }
      if (
        !contestant.description ||
        contestant.description.trim().length < 30 ||
        contestant.description.trim().length > 300
      ) {
        error.description =
          'Minimum is 30 characters and maximum is 300 characters!'
        hasErrorInContestants = true
      }
      if (
        !contestant.file ||
        !ALLOWED_IMAGE_TYPES.includes(contestant.file.type)
      ) {
        error.file = 'File is required and allowed types are jpg, jpeg and png.'
        hasErrorInContestants = true
      }
      contestantNames.push(contestant.name)
      errors.push(error)
    })

    setContestantsError(errors)
    if (hasErrorInContestants) return

    try {
      setIsLoading(true)
      const { url } = await upload(`images/${getValues('imageName')}`, file, {
        access: 'public',
        handleUploadUrl: '/api/images/upload',
      })
      const topicId = uuidv4()
      const actionResult = await createNewTopic({
        ...formValue,
        imageName: url,
        id: topicId,
      })

      if (actionResult.status != 'Success') {
        setIsLoading(false)
        toast({
          description: actionResult.message,
          variant: 'destructive',
        })
        return
      }

      const uploadPromises = Promise.all([
        ...contestants.map((item) => {
          return upload(`images/${item.image_name}`, item.file!, {
            access: 'public',
            handleUploadUrl: '/api/images/upload',
          })
        }),
      ])
      const uploadResult = await uploadPromises

      const contestantsResult = await saveContestants(
        contestants.map((contestant, index) => {
          return {
            name: contestant.name,
            description: contestant.description,
            vote_count: 0,
            topics_id: topicId,
            image_name: uploadResult[index].url,
          }
        })
      )

      toast({
        variant:
          contestantsResult.status == 'Success' ? 'default' : 'destructive',
        description: contestantsResult.message,
      })
      setIsLoading(false)
      push('/admin/dashboard/topics')
    } catch (e) {
      setIsLoading(false)
      toast({
        description: (e as unknown as any).message,
        variant: 'destructive',
      })
    }
  })

  useEffect(() => {
    setPageTitle('New Topic')
  }, [])

  return (
    <div className="w-100 min-h-screen mt-[72px] p-5 flex justify-center">
      <Card className="mt-3 w-full md:w-[600px]">
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
                <div className="my-1">
                  <FormLabel>
                    Description <span className="text-red-500">*</span>
                  </FormLabel>
                  <MDXEditor
                    markdown={''}
                    className="editor border rounded-md"
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
                <div className="my-1">
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
                <div className="my-1">
                  <Label>Topics' Image</Label>
                  <Input
                    type="file"
                    ref={imageRef}
                    placeholder={'Choose Image (png or jpa or jpeg)'}
                    accept="image/png,image/jpg,image/jpeg"
                    onChange={(e) => {
                      !getValues('imageName') &&
                        setValue(
                          'imageName',
                          `${uuidv4()}_${format(
                            new Date(
                              Date.now() +
                                1000 * 60 * -new Date().getTimezoneOffset()
                            ) as Date,
                            'dd-MM-yyyy/HH:mm:ss'
                          )}.jpeg`
                        )
                    }}
                  />
                  <Label className="text-red-500 font-normal text-[12px]">
                    {errors.imageName?.message}
                  </Label>
                </div>
                <CreateContestantForm
                  onAddContestant={(newItem) => {
                    setContestants((prev) => {
                      return [...prev, newItem]
                    })
                  }}
                  onRemoveContestant={(targetIndex) => {
                    console.log(targetIndex)
                    setContestants((prev) => {
                      return prev.filter((_item, index) => {
                        return targetIndex !== index
                      })
                    })
                  }}
                  onChangeContesant={(target, newVal) => {
                    setContestants((prev) => {
                      return prev.map((old, index) => {
                        if (index == target) return { ...newVal }
                        return old
                      })
                    })
                  }}
                  contestants={contestants}
                  errors={contestantsError}
                />
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
