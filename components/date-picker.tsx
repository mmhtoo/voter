import { cn } from '@/libs/utils'
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/components/ui/popover'
import { addDays, format, setDate } from 'date-fns'
import { Calendar } from '@/components/ui/calendar'
import { date } from 'zod'
import { FormLabel } from './ui/form'
import { Button } from './ui/button'
import { FC } from 'react'
import { CalendarIcon } from 'lucide-react'
import {
  SelectRangeEventHandler,
  SelectSingleEventHandler,
} from 'react-day-picker'
import { Label } from './ui/label'

type CustomDatePickerProps = {
  label?: string
  value?: Date
  placeholder?: string
  onSelect: SelectSingleEventHandler
  error?: string
  isRequired?: boolean
}

export const CustomDatePicker: FC<CustomDatePickerProps> = (props) => {
  const {
    label = 'Date',
    onSelect,
    placeholder = 'Pick a date',
    value,
    error,
    isRequired,
  } = props
  return (
    <div className="flex flex-col gap-1">
      <FormLabel>
        {label} {isRequired && <span className="text-red-500">*</span>}
      </FormLabel>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={'outline'}
            className={cn(
              'w-[240px] justify-start text-left font-normal',
              !date && 'text-muted-foreground'
            )}>
            <CalendarIcon className="mr-2 h-4 w-4" />
            {value ? format(value, 'PPP') : <span>{placeholder}</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0 z-10" align="start">
          <Calendar
            mode="single"
            selected={value! as Date}
            onSelect={onSelect}
            className="dark:bg-black bg-white rounded-md border z-10 overflow-hidden shadow"
          />
        </PopoverContent>
      </Popover>
      <span className="text-red-500 font-normarl text-[12px]">{error}</span>
    </div>
  )
}

type CustomDateRangePicker = {
  label?: string
  from?: Date
  to?: Date
  placeholder?: string
  onSelect: SelectRangeEventHandler
  className?: string
  numberOfMonths?: number
  error?: string
  isRequired?: boolean
}

export const CustomDateRangePicker: FC<CustomDateRangePicker> = (props) => {
  const {
    label = 'Label',
    from,
    to,
    placeholder = 'Pick a date',
    onSelect,
    className,
    numberOfMonths = 2,
    error,
    isRequired = false,
  } = props
  return (
    <div className="flex flex-col gap-1">
      <Label>
        {label} {isRequired && <span className="text-red-500">*</span>}
      </Label>
      <div className={cn('grid gap-2', className)}>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              id="date"
              variant={'outline'}
              className={cn(
                'w-100 justify-start text-left font-normal',
                !date && 'text-muted-foreground'
              )}>
              <CalendarIcon className="mr-2 h-4 w-4" />
              {from ? (
                to ? (
                  <>
                    {format(from, 'LLL dd, y')} - {format(to, 'LLL dd, y')}
                  </>
                ) : (
                  format(from, 'LLL dd, y')
                )
              ) : (
                <span>{placeholder}</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 z-10" align="start">
            <Calendar
              mode="range"
              defaultMonth={from}
              disabled={[
                {
                  from: new Date(0),
                  to: addDays(new Date(), -1),
                },
              ]}
              selected={{
                from,
                to,
              }}
              onSelect={onSelect}
              numberOfMonths={numberOfMonths}
            />
          </PopoverContent>
        </Popover>
      </div>
      <span className="text-red-500 font-normarl text-[12px]">{error}</span>
    </div>
  )
}
