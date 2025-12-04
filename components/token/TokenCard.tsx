import { Card, CardContent } from '@/components/ui/card'
import { TokenAmountDisplay } from './TokenAmountDisplay'
import { TokenPriceDisplay } from './TokenPriceDisplay'
import { UsdInput } from './UsdInput'
import type { Token, TokenData } from '@/lib/types'

interface TokenCardProps {
  variant: 'source' | 'target'
  loading: boolean
  amount: string
  selectedToken: string
  onTokenChange: (value: string) => void
  availableTokens: Token[]
  tokenData?: TokenData
  usdAmount?: string
  onUsdAmountChange?: (value: string) => void
}

export const TokenCard = ({
  variant,
  loading,
  amount,
  selectedToken,
  onTokenChange,
  availableTokens,
  tokenData,
  usdAmount,
  onUsdAmountChange,
}: TokenCardProps) => {
  const isSource = variant === 'source'
  const gradientClass = isSource
    ? 'from-blue-50/80 via-blue-100/60 to-cyan-50/80 dark:from-blue-950/40 dark:via-blue-900/30 dark:to-cyan-950/40'
    : 'from-purple-50/80 via-purple-100/60 to-pink-50/80 dark:from-purple-950/40 dark:via-purple-900/30 dark:to-pink-950/40'

  return (
    <Card className={`w-full md:flex-1 border-2 bg-gradient-to-br ${gradientClass} backdrop-blur-sm`}>
      <CardContent className="p-6">
        <div className="space-y-4">
          {/* USD Input (only for source card) */}
          {isSource && usdAmount !== undefined && onUsdAmountChange && (
            <UsdInput value={usdAmount} onChange={onUsdAmountChange} />
          )}

          {/* Spacer for target card to match source card height (desktop only) */}
          {!isSource && (
            <div className="invisible h-[68px] hidden md:block" aria-hidden="true">
              <div className="text-xs font-medium mb-2">Spacer</div>
              <div className="h-12"></div>
            </div>
          )}

          {/* Token Amount Display with Selector */}
          <TokenAmountDisplay
            label={isSource ? 'Sell' : 'Buy'}
            id={isSource ? 'source-token' : 'target-token'}
            amount={amount}
            loading={loading}
            selectedToken={selectedToken}
            onTokenChange={onTokenChange}
            availableTokens={availableTokens}
          />

          {/* Price Display */}
          <TokenPriceDisplay loading={loading} tokenData={tokenData} />
        </div>
      </CardContent>
    </Card>
  )
}
