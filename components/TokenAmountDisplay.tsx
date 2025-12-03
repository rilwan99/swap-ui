import { Loader2 } from 'lucide-react'
import { Label } from '@/components/ui/label'
import { TokenSelector } from './TokenSelector'
import { formatNumberWithCommas } from '@/lib/format'
import type { Token } from '@/lib/types'

interface TokenAmountDisplayProps {
  label: string
  id: string
  amount: string
  loading: boolean
  selectedToken: string
  onTokenChange: (value: string) => void
  availableTokens: Token[]
}

export const TokenAmountDisplay = ({
  label,
  id,
  amount,
  loading,
  selectedToken,
  onTokenChange,
  availableTokens,
}: TokenAmountDisplayProps) => {
  return (
    <div>
      <Label htmlFor={id} className="text-xs font-medium text-muted-foreground mb-2 block">
        {label}
      </Label>
      {loading ? (
        <div className="flex items-center gap-2 h-12">
          <Loader2 className="h-5 w-5 animate-spin" />
          <span className="text-sm">Calculating...</span>
        </div>
      ) : (
        <div className="h-12 flex items-center justify-between px-3 bg-background/50 rounded-md border gap-2">
          <p className="text-xl font-bold break-all flex-1">
            {formatNumberWithCommas(amount)}
          </p>
          <TokenSelector
            id={id}
            value={selectedToken}
            onValueChange={onTokenChange}
            tokens={availableTokens}
          />
        </div>
      )}
    </div>
  )
}
