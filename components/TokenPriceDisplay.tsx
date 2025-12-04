import { Skeleton } from '@/components/ui/skeleton'
import { formatNumberWithCommas } from '@/lib/format'
import { TOKEN_PRICE_DECIMALS } from '@/lib/constants'
import type { TokenData } from '@/lib/types'

interface TokenPriceDisplayProps {
  loading: boolean
  tokenData?: TokenData
}

export const TokenPriceDisplay = ({
  loading,
  tokenData,
}: TokenPriceDisplayProps) => {

  return (
    <div className="px-3 py-2 bg-muted/50 rounded-md border border-border/50 backdrop-blur-sm">
      {loading ? (
        <Skeleton className="h-5 w-24 bg-muted-foreground/20 dark:bg-muted-foreground/30" />
      ) : (
        <p className="text-sm font-semibold text-foreground">
          {tokenData?.symbol && tokenData?.price
            ? `1 ${tokenData.symbol} ≈ $${formatNumberWithCommas(tokenData.price.toFixed(TOKEN_PRICE_DECIMALS))}`
            : '—'
          }
        </p>
      )}
    </div>
  )
}
