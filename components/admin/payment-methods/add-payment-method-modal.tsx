'use client'
import createPaymentMethod from '@/actions/admin/payment-methods/createPaymentMethod'
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useToast } from '@/components/ui/use-toast'
import {
  AddPaymentMethodWithAccountForm,
  AddPaymentMethodWithPhoneForm,
  addPaymentMethodSchemaWithPhone,
  addPaymentMethodSchemeWithAccount,
} from '@/libs/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { PlusCircle } from 'lucide-react'
import { useRef, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

export default function AddPaymentMethodModal() {
  const [tab, setTab] = useState<'phone' | 'account'>('phone')
  const form = useForm<
    AddPaymentMethodWithPhoneForm & AddPaymentMethodWithAccountForm
  >({
    resolver: zodResolver(
      tab == 'account'
        ? addPaymentMethodSchemeWithAccount
        : addPaymentMethodSchemaWithPhone
    ),
  })
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = form
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const modalCancelRef = useRef<HTMLButtonElement | null>(null)

  const onSubmit = handleSubmit((formValues) => {
    setIsLoading(true)
    createPaymentMethod(formValues, tab).then((res) => {
      setIsLoading(false)
      if (res.status != 'Success') {
        return toast({
          description: res.message,
          variant: 'destructive',
        })
      }
      toast({
        description: res.message,
      })
      modalCancelRef.current?.click()
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
        <AlertDialogHeader className="text-xl text-yellow-500">
          New Payment Method
        </AlertDialogHeader>
        <AlertDialogDescription>
          <FormProvider {...form}>
            <form onSubmit={onSubmit}>
              <Tabs defaultValue={tab} className={'w-full'}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger onClick={() => setTab('phone')} value={'phone'}>
                    With Phone
                  </TabsTrigger>
                  <TabsTrigger
                    onClick={() => setTab('account')}
                    value={'account'}>
                    With Account
                  </TabsTrigger>
                </TabsList>
                <TabsContent value={'phone'}>
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
                </TabsContent>
                <TabsContent value={'account'}>
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
                </TabsContent>
              </Tabs>
              <Label className="text-red-500 font-normal text-[12px]">
                * Please make sure not to be wrong payment's phone and account!
              </Label>
              <AlertDialogFooter className="mt-3">
                <AlertDialogCancel ref={modalCancelRef}>
                  Cancel
                </AlertDialogCancel>
                <Button disabled={isLoading} type="submit" className="">
                  {isLoading ? 'Loading...' : 'Add'}
                </Button>
              </AlertDialogFooter>
            </form>
          </FormProvider>
        </AlertDialogDescription>
      </AlertDialogContent>
    </AlertDialog>
  )
}
