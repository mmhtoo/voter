'use client'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { useForm, FormProvider } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Label } from '@/components/ui/label'
import login from '@/actions/admin/login'
import { useState } from 'react'
import { useToast } from '@/components/ui/use-toast'
import { useRouter } from 'next/navigation'

const schema = z.object({
  email: z
    .string({ required_error: 'Email is required!' })
    .email('Invalid email format!'),
  password: z.string({ required_error: 'Password is required!' }),
})

type LoginForm = z.infer<typeof schema>

export default function AdminLoginPage() {
  const form = useForm<LoginForm>({ resolver: zodResolver(schema) })
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const { replace } = useRouter()

  const handleSubmit = form.handleSubmit((formValue) => {
    setIsLoading(true)
    login(formValue.email, formValue.password)
      .then((res) => {
        setIsLoading(false)
        if (res.status != 'Success') {
          toast({ description: res.message, variant: 'destructive' })
          return
        }
        toast({
          description: res.message,
        })
        replace('/admin/dashboard')
      })
      .catch((e) => {
        setIsLoading(false)
        toast({
          description: e,
          variant: 'destructive',
        })
      })
  })

  return (
    <div className="w-100 min-h-screen flex justify-center items-center">
      <Card className="w-[350px] pb-2">
        <CardHeader>
          <CardTitle>Admin Login</CardTitle>
          <CardDescription>
            Login in account to manage voting system!
          </CardDescription>
        </CardHeader>
        <Separator />
        <CardContent className="pt-3 pb-4">
          <FormProvider {...form}>
            <form onSubmit={handleSubmit} className="flex flex-col gap-1">
              <FormField
                control={form.control}
                name="email"
                render={({ field, formState: { errors } }) => (
                  <FormItem>
                    <FormLabel>
                      Email <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        aria-describedby="email-error"
                        type="email"
                        placeholder="Enter email address"
                        {...field}
                      />
                    </FormControl>
                    <Label
                      id="email-error"
                      className="text-red-500 font-normal text-[12px]">
                      {errors?.email?.message}
                    </Label>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field, formState: { errors } }) => (
                  <FormItem>
                    <FormLabel>
                      Password <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        aria-describedby="password-error"
                        type="password"
                        placeholder="Enter password"
                        {...field}
                      />
                    </FormControl>
                    <Label
                      id="password-error"
                      className="text-red-500 font-normal text-[12px]">
                      {errors?.password?.message}
                    </Label>
                  </FormItem>
                )}
              />
              <Button
                disabled={isLoading}
                onClick={handleSubmit}
                className="mt-2 w-full">
                {isLoading ? 'Loading...' : 'Login'}
              </Button>
            </form>
          </FormProvider>
        </CardContent>
      </Card>
    </div>
  )
}
