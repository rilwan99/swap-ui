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
    <div className="mt-6 p-4 bg-muted rounded-lg text-center">
      <p className="text-sm text-muted-foreground">
        1 {sourceToken} ≈{' '}
        <span className="font-semibold">{exchangeRate}</span>{' '}
        {targetToken}
      </p>
    </div>
  )
}
