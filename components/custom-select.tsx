import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from './ui/select'

type CustomSelectProps = {
  label?: string
  items: { displayVal: string; value: string }[]
  placeholder?: string
  selectLabel: string
  onSelect: (val: string) => void
  className?: string
}

export default function CustomSelect(props: CustomSelectProps) {
  const {
    label,
    items = [],
    placeholder,
    selectLabel = 'Items',
    onSelect,
    className,
  } = props

  return (
    <Select>
      <SelectTrigger>
        <SelectValue className={className} placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{selectLabel}</SelectLabel>
          {items.map((item) => {
            return (
              <SelectItem
                onClick={() => onSelect(item.value)}
                value={item.value}
                key={item.value}>
                {item.displayVal}
              </SelectItem>
            )
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
