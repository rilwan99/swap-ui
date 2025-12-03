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
        <Loader2 className="h-4 w-4 animate-spin" />
        <span className="text-sm">Loading...</span>
      </div>
    )
  }

  return (
    <p className="text-sm text-muted-foreground font-medium">
      ${tokenData?.price ? formatNumberWithCommas(tokenData.price.toFixed(TOKEN_PRICE_DECIMALS)) : '—'}
    </p>
  )
}
