import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import type { Token } from '@/lib/types'

interface TokenSelectorProps {
  id: string
  value: string
  onValueChange: (value: string) => void
  tokens: Token[]
}

export const TokenSelector = ({
  id,
  value,
  onValueChange,
  tokens,
}: TokenSelectorProps) => {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger
        id={id}
        className="w-[120px] h-8 text-sm font-semibold border-2 border-border bg-muted/30 backdrop-blur-sm shadow-sm hover:border-primary/70 hover:bg-muted/40 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
      >
        <SelectValue placeholder="Select token" />
      </SelectTrigger>
      <SelectContent>
        {tokens.map((token) => (
          <SelectItem key={token.symbol} value={token.symbol}>
            <div className="flex items-center gap-2">
              <img
                src={token.image}
                alt={token.symbol}
                className="w-4 h-4 rounded-full"
              />
              <span className="font-semibold">{token.symbol}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
