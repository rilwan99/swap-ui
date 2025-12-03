import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { formatNumberWithCommas, removeCommas } from '@/lib/format'

interface UsdInputProps {
  value: string
  onChange: (value: string) => void
}

export const UsdInput = ({ value, onChange }: UsdInputProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = removeCommas(e.target.value)
    if (rawValue === '' || !isNaN(parseFloat(rawValue))) {
      onChange(rawValue)
    }
  }

  return (
    <div>
      <Label htmlFor="usd-amount" className="text-xs font-medium text-muted-foreground mb-2 block">
        Enter USD Amount
      </Label>
      <Input
        id="usd-amount"
        type="text"
        value={value ? formatNumberWithCommas(value) : ''}
        onChange={handleChange}
        placeholder="0.00"
        className="h-12"
      />
    </div>
  )
}
