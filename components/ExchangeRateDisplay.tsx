import { calculateExchangeRate } from '@/lib/api'
import type { TokenData } from '@/lib/types'

interface ExchangeRateDisplayProps {
  sourceToken: string
  targetToken: string
  sourceTokenData?: TokenData
  targetTokenData?: TokenData
}

export const ExchangeRateDisplay = ({
  sourceToken,
  targetToken,
  sourceTokenData,
  targetTokenData,
}: ExchangeRateDisplayProps) => {
  if (!sourceTokenData || !targetTokenData) {
    return null
  }

  const exchangeRate = calculateExchangeRate(
    sourceTokenData.price,
    targetTokenData.price
  )

  return (
    <div className="mt-6 p-4 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 rounded-lg text-center border border-primary/20 backdrop-blur-sm">
      <p className="text-sm text-muted-foreground">
        1 {sourceToken} ≈{' '}
        <span className="font-semibold text-primary">{exchangeRate}</span>{' '}
        {targetToken}
      </p>
    </div>
  )
}
