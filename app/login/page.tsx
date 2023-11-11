'use client'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import Link from 'next/link'
import { Form, useForm, FormProvider } from 'react-hook-form'

type Form = {
  username: string
  email: string
  password: string
}

export default function PublicLoginPage() {
  const form = useForm<Form>()

  return (
    <div className="w-100 min-h-screen flex justify-center items-center">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Login Account</CardTitle>
          <CardDescription>
            Login in to your account to be able to vote!
          </CardDescription>
        </CardHeader>
        <Separator />
        <CardContent className="pt-3 pb-4">
          <FormProvider {...form}>
            <form className="flex flex-col gap-1">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Enter email address"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter password"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </form>
          </FormProvider>
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
          <Button className="mt-2 w-full">Login</Button>
          <Label className="font-normarl text-sm">
            New user ?{' '}
            <Link href={'/register'} className="underline font-lighter">
              Register Here
            </Link>
          </Label>
        </CardFooter>
      </Card>
    </div>
  )
}
