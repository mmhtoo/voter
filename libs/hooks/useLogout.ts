'use client'

import { useToast } from '@/components/ui/use-toast'
import { useRouter } from 'next/navigation'

export default function useLogout() {
  const { replace } = useRouter()
  const { toast } = useToast()

  return () => {
    // other logic

    toast({
      description: 'Successfully logged out!',
    })
    replace('/admin/login')
  }
}
