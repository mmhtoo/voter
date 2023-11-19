'use client'

import createPricing from '@/actions/admin/pricings/createPricing'
import {
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogCancel,
  AlertDialogDescription,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/components/ui/use-toast'
import { CreatePricingForm, createPricingSchema } from '@/libs/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { PlusCircle } from 'lucide-react'
import { useRef, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

export default function NewPricingModal() {
  const form = useForm<CreatePricingForm>({
    resolver: zodResolver(createPricingSchema),
  })
  const {
    control,
    formState: { errors },
    handleSubmit,
    resetField,
  } = form

  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const closeModalRef = useRef<HTMLButtonElement | null>(null)

  const onSubmit = handleSubmit((formValue) => {
    setIsLoading(true)
    createPricing(formValue)
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
        resetField('point')
        resetField('amount')
        closeModalRef.current?.click()
      })
      .catch((e) => {
        setIsLoading(false)
        toast({
          description: e.message,
          variant: 'default',
        })
      })
  })

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant={'secondary'}
          className={'flex items-center gap-2 me-3 text-green-500'}>
          <PlusCircle />
          New
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader className="text-yellow-500 text-lg">
          New Pricing
        </AlertDialogHeader>
        <AlertDialogDescription asChild>
          <FormProvider {...form}>
            <form onSubmit={onSubmit}>
              <FormField
                control={control}
                name={'point'}
                render={({ field }) => {
                  return (
                    <FormItem className="my-2">
                      <FormLabel>
                        Point <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          aria-describedby="error-point"
                          type={'number'}
                          placeholder={'Example 10 or 100 or 1000'}
                          {...field}
                        />
                      </FormControl>
                      <Label
                        id="error-point"
                        className="text-red-500 font-normal text-[12px]">
                        {errors.point?.message}
                      </Label>
                    </FormItem>
                  )
                }}
              />
              <FormField
                control={control}
                name={'amount'}
                render={({ field }) => {
                  return (
                    <FormItem className="my-2">
                      <FormLabel>
                        Amount(MMK)
                        <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          aria-describedby="error-amount"
                          type={'number'}
                          placeholder={'Example 10 or 1000 or 10000 '}
                          {...field}
                        />
                      </FormControl>
                      <Label
                        id="error-amount"
                        className="text-red-500 font-normal text-[12px]">
                        {errors.amount?.message}
                      </Label>
                    </FormItem>
                  )
                }}
              />
            </form>
          </FormProvider>
        </AlertDialogDescription>
        <AlertDialogFooter>
          <AlertDialogCancel ref={closeModalRef}>Cancel</AlertDialogCancel>
          <Button disabled={isLoading} onClick={onSubmit}>
            {isLoading ? 'Creating' : 'Create'}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
