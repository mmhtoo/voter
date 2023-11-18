import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import { LeafyGreen } from 'lucide-react'

export default function TopicEditFormSkeleton() {
  return (
    <div className="w-100 min-h-screen mt-[72px] p-5 flex justify-center">
      <Card className="mt-3 w-full md:w-[550px]">
        <CardHeader>
          <h1 className="flex items-center mb-2 ms-2 gap-2">
            <LeafyGreen className="text-green-500" />
            <span className="font-normal text-[18px]">Create New Topic</span>
          </h1>
          <Separator />
          <CardContent className="py-5">
            <div className="my-2">
              <Label>
                Name <span className="text-red-500">*</span>
              </Label>
              <div className="w-100 h-8">
                <Skeleton className="w-100 h-8" />
              </div>
            </div>
            <div className="my-2">
              <Label>
                Description <span className="text-red-500">*</span>
              </Label>
              <div className="w-100 min-h-[150px] max-h-[150px]">
                <Skeleton className="w-100 min-h-[150px]" />
              </div>
            </div>
            <div className="my-2">
              <Label>
                Required Points per One vote{' '}
                <span className="text-red-500">*</span>
              </Label>
              <div className="w-100 h-8">
                <Skeleton className="w-100 h-8" />
              </div>
            </div>
            <div className="my-2">
              <Label>
                Start date to End date <span className="text-red-500">*</span>
              </Label>
              <Skeleton className="w-100 h-8" />
            </div>
            <div className="w-100 my-2">
              <Skeleton className="w-100 h-8" />
            </div>
          </CardContent>
        </CardHeader>
      </Card>
    </div>
  )
}
