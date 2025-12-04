import { Label } from '@/components/ui/label'
import { NumericFormat } from 'react-number-format'

interface UsdInputProps {
  value: string
  onChange: (value: string) => void
}

export const UsdInput = ({ value, onChange }: UsdInputProps) => {
  return (
    <div>
      <Label htmlFor="usd-amount" className="text-sm font-semibold text-foreground mb-2 block">
        USD Amount
      </Label>
      <NumericFormat
        id="usd-amount"
        value={value}
        onValueChange={(values) => {
          onChange(values.value)
        }}
        thousandSeparator=","
        decimalScale={2}
        fixedDecimalScale={false}
        allowNegative={false}
        allowLeadingZeros={false}
        placeholder="0.00"
        className="flex h-12 w-full rounded-md border-[2px] border-primary/40 bg-muted px-3 py-2 text-lg font-semibold shadow-lg ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground hover:border-primary/70 hover:bg-accent/30 focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-50 transition-all"
      />
    </div>
  )
}
