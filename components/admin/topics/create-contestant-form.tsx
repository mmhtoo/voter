import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
} from '@/components/ui/alert-dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  CreateContestantFormType,
  CreateContestantFormType as FormType,
} from '@/libs/schemas'
import { PlusCircle, TrashIcon } from 'lucide-react'
import { useState } from 'react'
import { v4 as uuidV4 } from 'uuid'

type Props = {
  onAddContestant: (newItem: FormType & { file?: File }) => void
  onRemoveContestant: (index: number) => void
  onChangeContesant: (
    index: number,
    newVal: CreateContestantFormType & { file?: File }
  ) => void
  contestants: (FormType & { file?: File })[]
  errors: (CreateContestantFormType & { file: string })[]
}

export default function CreateContestantForm(props: Props) {
  const {
    contestants,
    onAddContestant,
    onRemoveContestant,
    onChangeContesant,
    errors,
  } = props
  const [showRemoveAlert, setRemoveShowAlert] = useState(false)
  const [indexToBeRemoved, setIndexToBeRemoved] = useState<number>()

  return (
    <>
      <div className="w-100 grid grid-cols-2 gap-3">
        {contestants.map((contestant, index) => {
          return (
            <div className="min-h-[150px] p-2  w-100 border rounded-md flex flex-col gap-1 relative">
              <TrashIcon
                onClick={() => {
                  setRemoveShowAlert(true)
                  setIndexToBeRemoved(index)
                }}
                width={16}
                height={16}
                className="text-red-500 cursor-pointer absolute right-3 top-3"
              />
              <div className="flex flex-col gap-2 mt-[24px]">
                <div>
                  <Input
                    type="text"
                    placeholder={"Contestant's Name"}
                    value={contestant.name}
                    onChange={(e) => {
                      onChangeContesant(index, {
                        ...contestant,
                        name: e.target.value,
                      })
                    }}
                  />
                  {errors.length > 0 && (
                    <label className="error text-[12px] text-red-500 leading-none">
                      {errors[index].name}
                    </label>
                  )}
                </div>
                <div>
                  <textarea
                    rows={4}
                    placeholder="Description"
                    value={contestant.description}
                    onChange={(e) => {
                      onChangeContesant(index, {
                        ...contestant,
                        description: e.target.value,
                      })
                    }}
                    className="flex  w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"></textarea>

                  {errors.length > 0 && (
                    <label className="error text-[12px] text-red-500 leading-none">
                      {errors[index].description}
                    </label>
                  )}
                </div>
                <div>
                  <Input
                    type={'file'}
                    accept="image/png,image/jpg,image/jpeg"
                    onChange={(e) => {
                      const file = e.target.files && e.target.files[0]
                      if (!file) return
                      onChangeContesant(index, {
                        ...contestant,
                        file,
                        image_name: contestant.image_name || `${uuidV4()}.jpg`,
                      })
                    }}
                  />
                  {errors.length > 0 && (
                    <label className="error text-[12px] text-red-500 leading-none ">
                      {errors[index].file}
                    </label>
                  )}
                </div>
              </div>
            </div>
          )
        })}
        <div
          onClick={() => {
            onAddContestant({
              name: ``,
              image_name: '',
              description: '',
              file: undefined,
            })
          }}
          className="min-h-[150px] border hover:cursor-pointer rounded-md flex flex-col  items-center justify-center">
          <PlusCircle />
          <Label>Add Contestant</Label>
        </div>
      </div>
      <Label>Total Contestants : {contestants.length}</Label>
      <AlertDialog open={showRemoveAlert}>
        <AlertDialogContent>
          <AlertDialogHeader className={'text-[24px] text-red-500'}>
            Are you sure to remove this contestant?
          </AlertDialogHeader>
          <AlertDialogDescription>
            Please make sure before you do because you can't undo after
            succeeded!
          </AlertDialogDescription>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => {
                setRemoveShowAlert(false)
              }}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                indexToBeRemoved != undefined &&
                  onRemoveContestant(indexToBeRemoved)
                setRemoveShowAlert(false)
              }}>
              Ok
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
