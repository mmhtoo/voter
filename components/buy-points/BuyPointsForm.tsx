'use client'

import { Label } from '@radix-ui/react-label'
import {
  SelectValue,
  SelectLabel,
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectGroup,
} from '../ui/select'
import { Coins } from 'lucide-react'
import { FormProvider, useForm } from 'react-hook-form'
import { Card, CardHeader, CardContent } from '../ui/card'
import { FormControl, FormField, FormItem, FormLabel } from '../ui/form'
import { FormEvent, useEffect, useRef, useState } from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { RequestBuyPointsForm, requestBuyPointsSchema } from '@/libs/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAuth } from '@clerk/nextjs'
import { useToast } from '../ui/use-toast'
import { upload } from '@vercel/blob/client'
import { v4 as uuidv4 } from 'uuid'
import { ALLOWED_IMAGE_TYPES } from '@/libs/data/constants'
import getCustomerByClerkId from '@/actions/customer/getCustomerByClerkId'
import requestPoints from '@/actions/buy-points/requestPoints'

type Props = {
  pricings: Pricing[]
}

export default function BuyPointsForm({ pricings }: Props) {
  const { userId } = useAuth()
  const [pricingsMap, setPricingsMap] = useState<{
    [key: string]: {
      amount: number
      id: string
    }
  }>({})
  const form = useForm<
    RequestBuyPointsForm & {
      price: number
      point: string
    }
  >({
    resolver: zodResolver(requestBuyPointsSchema),
  })
  const {
    control,
    watch,
    setValue,
    formState: { errors },
    handleSubmit,
    getValues,
    setError,
  } = form
  const { toast } = useToast()
  const screenshootRef = useRef<File | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (screenshootRef.current && !getValues('screenshoot')) {
      if (!ALLOWED_IMAGE_TYPES.includes(screenshootRef.current.type)) {
        setError('screenshoot', { message: 'Invalid image format~' })
        return
      }
      setIsLoading(true)
      const imageId = uuidv4()
      try {
        const { url } = await upload(
          `images/${imageId}.jpg`,
          screenshootRef.current,
          {
            access: 'public',
            handleUploadUrl: '/api/images/upload',
          }
        )
        setIsLoading(false)
        setValue('screenshoot', url)
      } catch (e) {
        setIsLoading(false)
        console.log('Error at BuyPoinstForm ', e)
        toast({
          variant: 'destructive',
          description: (e as unknown as any).message,
        })
      }
    }
    handleSubmit(async (formValues) => {
      setIsLoading(true)
      console.log(formValues.clerkId)
      const savedData = await getCustomerByClerkId(formValues.clerkId)
      if (!savedData) {
        setIsLoading(false)
        toast({
          variant: 'destructive',
          description: 'Invalid User!',
        })
        return
      }
      const param: RequestBuyPointsForm = {
        clerkId: savedData.userid,
        pricingId: formValues.pricingId,
        screenshoot: formValues.screenshoot,
      }
      console.log(param)
      try {
        const response = await requestPoints(param)
        setIsLoading(false)
        if (response.status != 'Success') {
          return toast({
            variant: 'destructive',
            description: response.message,
          })
        }
        toast({
          description: response.message,
        })
      } catch (e) {
        setIsLoading(false)
        toast({
          variant: 'destructive',
          description: (e as unknown as any).message,
        })
      }
    })()
  }

  useEffect(() => {
    const target = pricingsMap[watch('point')]
    if (!target) return
    setValue('price', target.amount)
    setValue('pricingId', target.id)
  }, [watch('point')])

  useEffect(() => {
    const temp: {
      [key: string]: {
        amount: number
        id: string
      }
    } = {}
    pricings.forEach((pricing) => {
      temp[pricing.id] = {
        amount: pricing.amount,
        id: pricing.id,
      }
    })
    setPricingsMap(temp)
  }, [])

  useEffect(() => {
    if (!userId) return
    setValue('clerkId', userId)
  }, [userId])

  useEffect(() => {
    if (!errors.clerkId?.message) return
    toast({
      variant: 'destructive',
      description: 'Invalid user Id!',
    })
  }, [errors.clerkId])

  useEffect(() => {
    console.log(watch('screenshoot'))
  }, [watch('screenshoot')])

  console.log(errors)

  return (
    <Card className="w-[90%] md:w-[500px]">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Coins className="text-yellow-500 w-[24px] " />
          <Label className="text-[24px]">Buy Points</Label>
        </div>
      </CardHeader>
      <CardContent>
        <FormProvider {...form}>
          <form onSubmit={onSubmit}>
            <FormField
              control={control}
              name={'point'}
              render={({ field }) => {
                return (
                  <FormItem>
                    <Label>
                      Point <span className="text-red-500">*</span>
                    </Label>
                    <FormControl>
                      <>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}>
                          <SelectTrigger>
                            <SelectValue placeholder={'Choose plan'} />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Plans</SelectLabel>
                              {pricings.map((pricing) => {
                                return (
                                  <SelectItem value={pricing.id}>
                                    {pricing.point} Points -{' '}
                                    {pricing.amount.toLocaleString()} MMK
                                  </SelectItem>
                                )
                              })}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                        <Label
                          id="error-topic-name"
                          className="text-red-500 font-normal text-[12px]">
                          {errors.pricingId?.message?.toString()}
                        </Label>
                      </>
                    </FormControl>
                  </FormItem>
                )
              }}
            />
            <FormField
              control={control}
              name={'price'}
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Price (MMK)</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        readOnly
                        placeholder={'Price for Point (MMK)'}
                      />
                    </FormControl>
                    <Label
                      id="error-topic-name"
                      className="text-red-500 font-normal text-[12px]">
                      {errors?.pricingId?.message}
                    </Label>
                  </FormItem>
                )
              }}
            />
            <FormField
              control={control}
              name={'screenshoot'}
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>
                      Screenshoot <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <>
                        <Input
                          type={'file'}
                          onChange={(e) => {
                            const files = e.target.files
                            screenshootRef.current = files ? files[0]! : null
                          }}
                          accept={'image/png,image/jpg,image/jpeg'}
                          placeholder={'Choose Image'}
                        />
                        <Label
                          id="error-topic-name"
                          className="text-red-500 font-normal text-[12px]">
                          {errors.screenshoot?.message?.toString()}
                        </Label>
                      </>
                    </FormControl>
                  </FormItem>
                )
              }}
            />
            <div className="w-full mt-3">
              <Button type="submit" className="w-full">
                Buy
              </Button>
            </div>
          </form>
        </FormProvider>
      </CardContent>
    </Card>
  )
}
