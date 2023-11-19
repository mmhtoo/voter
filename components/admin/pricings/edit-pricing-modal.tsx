'use client'

import updatePricing from '@/actions/admin/pricings/updatePricing'
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
import { UpdatePricingForm, updatePricingSchema } from '@/libs/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useRef, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

type Props = {
  show: boolean
  data?: Pricing
  onCancel: () => void
}

export default function EditPricingModal({ show, data, onCancel }: Props) {
  const form = useForm<UpdatePricingForm>({
    resolver: zodResolver(updatePricingSchema),
  })
  const {
    control,
    formState: { errors },
    handleSubmit,
    resetField,
    setValue,
  } = form

  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const closeModalRef = useRef<HTMLButtonElement | null>(null)
  const modalTriggerRef = useRef<HTMLButtonElement | null>(null)

  const onSubmit = handleSubmit((formValue) => {
    setIsLoading(true)
    updatePricing(formValue)
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

  useEffect(() => {
    if (show) {
      modalTriggerRef.current?.click()
      if (!data) return
      setValue('point', data.point.toString())
      setValue('id', data.id)
      setValue('amount', data.amount.toString())
    }
  }, [show])

  return (
    <AlertDialog>
      <AlertDialogTrigger ref={modalTriggerRef}></AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader className="text-yellow-500 text-lg">
          Update Pricing
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
          <AlertDialogCancel onClick={onCancel} ref={closeModalRef}>
            Cancel
          </AlertDialogCancel>
          <Button disabled={isLoading} onClick={onSubmit}>
            {isLoading ? 'Updating' : 'Update'}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
