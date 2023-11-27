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
import { useEffect, useState } from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'

type Props = {
  pricings: Pricing[]
}

export default function BuyPointsForm({ pricings }: Props) {
  const [pricingsMap, setPricingsMap] = useState<{ [key: string]: number }>({})
  const form = useForm()
  const { control, watch, setValue } = form

  useEffect(() => {
    setValue('price', pricingsMap[watch('point')])
  }, [watch('point')])

  useEffect(() => {
    const temp: { [key: string]: number } = {}
    pricings.forEach((pricing) => {
      temp[pricing.id] = pricing.amount
    })
    setPricingsMap(temp)
  }, [])

  useEffect(() => {
    console.log(watch('screenshoot'))
  }, [watch('screenshoot')])

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
          <form>
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
                      <Input
                        type={'file'}
                        onChange={(e) => {
                          const files = e.target.files
                          field.onChange({
                            target: { value: files ? files[0]! : null },
                            name: field.name,
                          })
                        }}
                        accept={'image/png,image/jpg,image/jpeg'}
                        placeholder={'Choose Image'}
                      />
                    </FormControl>
                  </FormItem>
                )
              }}
            />
            <div className="w-full mt-3">
              <Button className="w-full">Buy</Button>
            </div>
          </form>
        </FormProvider>
      </CardContent>
    </Card>
  )
}
