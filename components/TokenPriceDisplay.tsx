import { Loader2 } from 'lucide-react'
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
  if (loading) {
    return (
      <div className="flex items-center gap-2 text-muted-foreground">
        <Loader2 className="h-4 w-4 animate-spin text-primary" />
        <span className="text-sm">Loading...</span>
      </div>
    )
  }

  return (
    <div className="px-3 py-2 bg-muted/50 rounded-md border border-border/50 backdrop-blur-sm">
      <p className="text-sm font-semibold text-foreground">
        ${tokenData?.price ? formatNumberWithCommas(tokenData.price.toFixed(TOKEN_PRICE_DECIMALS)) : '—'}
      </p>
    </div>
  )
}
