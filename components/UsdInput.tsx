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
      <Label htmlFor="usd-amount" className="text-sm font-semibold text-foreground mb-2 block">
        Enter USD Amount
      </Label>
      <Input
        id="usd-amount"
        type="text"
        value={value ? formatNumberWithCommas(value) : ''}
        onChange={handleChange}
        placeholder="0.00"
        className="h-12 text-lg font-semibold border-[2px] border-primary/40 bg-muted shadow-lg hover:border-primary/70 hover:bg-accent/50 focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20 transition-all"
      />
    </div>
  )
}
