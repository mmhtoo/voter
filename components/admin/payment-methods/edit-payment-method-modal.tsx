'use client'
import updatePaymentMethod from '@/actions/admin/payment-methods/updatePaymentMethod'
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/components/ui/use-toast'
import {
  updatePaymentMethodSchemaWithAccount,
  updatePaymentMethodSchemaWithPhone,
  UpdatePaymentMethodWithAccountForm,
  UpdatePaymentMethodWithPhoneForm,
} from '@/libs/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { MutableRefObject, useEffect, useRef, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

type Props = {
  buttonRef: MutableRefObject<HTMLButtonElement | null>
  target: 'account' | 'phone'
  name: string
  phone?: string
  accountNumber?: string
  id: number
}

export default function EditPaymentMethodModal({
  buttonRef,
  name,
  target,
  accountNumber,
  phone,
  id,
}: Props) {
  const [tab, setTab] = useState<'phone' | 'account'>('phone')
  const form = useForm<
    UpdatePaymentMethodWithPhoneForm & UpdatePaymentMethodWithAccountForm
  >({
    resolver: zodResolver(
      tab == 'account'
        ? updatePaymentMethodSchemaWithAccount
        : updatePaymentMethodSchemaWithPhone
    ),
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
  const modalCancelRef = useRef<HTMLButtonElement | null>(null)

  const onSubmit = handleSubmit((formValues) => {
    setIsLoading(true)
    updatePaymentMethod(formValues, tab).then((res) => {
      setIsLoading(false)
      if (res.status != 'Success') {
        return toast({
          description: res.message,
          variant: 'destructive',
        })
      }
      resetField('name')
      resetField('phone')
      resetField('accountNumber')
      toast({
        description: res.message,
      })
      modalCancelRef.current?.click()
    })
  })

  useEffect(() => {
    setValue('id', id)
    setValue('name', name)
    target == 'account' && setValue('accountNumber', accountNumber!)
    target == 'phone' && setValue('phone', phone!)
    setTab(target)
  }, [id, name, accountNumber, phone])

  return (
    <AlertDialog>
      <AlertDialogTrigger ref={buttonRef}></AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader className="text-xl text-yellow-500">
          Edit Payment Method
        </AlertDialogHeader>
        <AlertDialogDescription>
          <FormProvider {...form}>
            <form onSubmit={onSubmit}>
              {target == 'phone' && (
                <>
                  <FormField
                    control={control}
                    name={'name'}
                    render={({ field }) => (
                      <FormItem className="my-2">
                        <FormLabel>
                          Payment Name <span className="text-red-500">*</span>
                        </FormLabel>
                        <Input
                          aria-describedby="name-error"
                          placeholder={
                            'Example AYA Pay or Kpay or Wave Pay or Some Name'
                          }
                          {...field}
                        />
                        <Label
                          id="name-error"
                          className="text-red-500 font-normal text-[12px]">
                          {errors?.name?.message}
                        </Label>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={control}
                    name={'phone'}
                    render={({ field }) => (
                      <FormItem className="my-2">
                        <FormLabel>
                          Phone <span className="text-red-500">*</span>
                        </FormLabel>
                        <Input
                          type="number"
                          aria-describedby="phone-error"
                          placeholder={'Example AYA Pay or Kpay or KBZ Account'}
                          {...field}
                        />
                        <Label
                          id="phone-error"
                          className="text-red-500 font-normal text-[12px]">
                          {errors.phone?.message}
                        </Label>
                      </FormItem>
                    )}
                  />
                </>
              )}
              {target == 'account' && (
                <>
                  <FormField
                    control={control}
                    name={'name'}
                    render={({ field }) => (
                      <FormItem className="my-2">
                        <FormLabel>
                          Payment Name <span className="text-red-500">*</span>
                        </FormLabel>
                        <Input
                          aria-describedby="name-error"
                          placeholder={
                            'Example AYA Bank or CB Bank or Yoma Bank or Some Name'
                          }
                          {...field}
                        />
                        <Label
                          id="name-error"
                          className="text-red-500 font-normal text-[12px]">
                          {errors.name?.message}
                        </Label>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={control}
                    name={'accountNumber'}
                    render={({ field }) => (
                      <FormItem className="my-2">
                        <FormLabel>
                          Account Number <span className="text-red-500">*</span>
                        </FormLabel>
                        <Input
                          type="number"
                          aria-describedby="account-error"
                          placeholder={'Example 0000 1111 2222 3333'}
                          {...field}
                        />
                        <Label
                          id="name-error"
                          className="text-red-500 font-normal text-[12px]">
                          {errors.accountNumber?.message}
                        </Label>
                      </FormItem>
                    )}
                  />
                </>
              )}
              <Label className="text-red-500 font-normal text-[12px]">
                * Please make sure not to be wrong payment's phone and account!
              </Label>
              <AlertDialogFooter className="mt-3">
                <AlertDialogCancel ref={modalCancelRef}>
                  Cancel
                </AlertDialogCancel>
                <Button disabled={isLoading} type="submit" className="">
                  {isLoading ? 'Loading...' : 'Update'}
                </Button>
              </AlertDialogFooter>
            </form>
          </FormProvider>
        </AlertDialogDescription>
      </AlertDialogContent>
    </AlertDialog>
  )
}
