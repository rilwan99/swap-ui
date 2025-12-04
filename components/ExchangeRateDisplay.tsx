import { calculateExchangeRate } from '@/lib/api'
import { Skeleton } from '@/components/ui/skeleton'
import type { TokenData } from '@/lib/types'

interface ExchangeRateDisplayProps {
  sourceToken: string
  targetToken: string
  sourceTokenData?: TokenData
  targetTokenData?: TokenData
  loading?: boolean
}

export const ExchangeRateDisplay = ({
  sourceToken,
  targetToken,
  sourceTokenData,
  targetTokenData,
  loading = false,
}: ExchangeRateDisplayProps) => {
  const hasData = sourceTokenData && targetTokenData
  const isLoading = loading && !hasData

  const exchangeRate = hasData
    ? calculateExchangeRate(sourceTokenData.price, targetTokenData.price)
    : null

  return (
    <div className="mt-6 p-4 h-[52px] bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 rounded-lg text-center border border-primary/20 backdrop-blur-sm flex items-center justify-center transition-all duration-200">
      {isLoading ? (
        <Skeleton className="h-5 w-48 bg-muted-foreground/20 dark:bg-muted-foreground/30" />
      ) : hasData ? (
        <p className="text-base font-semibold text-foreground animate-in fade-in duration-300">
          1 {sourceToken} ≈{' '}
          <span className="font-bold text-primary">{exchangeRate}</span>{' '}
          {targetToken}
        </p>
      ) : (
        <p className="text-sm text-muted-foreground italic">
          Enter USD amount to see exchange rate
        </p>
      )}
    </div>
  )
}
