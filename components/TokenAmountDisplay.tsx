import { Label } from '@/components/ui/label'
import { Skeleton } from '@/components/ui/skeleton'
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
      <div className="h-12 flex items-center justify-between px-3 bg-background/70 backdrop-blur-sm rounded-md border-2 border-border gap-2">
        {loading ? (
          <Skeleton className="h-6 flex-1 bg-muted-foreground/20 dark:bg-muted-foreground/30" />
        ) : (
          <p className="text-xl font-bold break-all flex-1 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            {formatNumberWithCommas(amount)}
          </p>
        )}
        <TokenSelector
          id={id}
          value={selectedToken}
          onValueChange={onTokenChange}
          tokens={availableTokens}
        />
      </div>
    </div>
  )
}
