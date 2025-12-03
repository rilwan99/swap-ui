'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowRight } from 'lucide-react'
import { TOKENS } from '@/lib/constants'
import { useTokenSelection } from '@/hooks/useTokenSelection'
import { useTokenPrices } from '@/hooks/useTokenPrices'
import { SupportedTokensList } from '@/components/SupportedTokensList'
import { ErrorDisplay } from '@/components/ErrorDisplay'
import { TokenCard } from '@/components/TokenCard'
import { ExchangeRateDisplay } from '@/components/ExchangeRateDisplay'

export default function TokenPriceExplorer() {
  const [usdAmount, setUsdAmount] = useState<string>('')

  // Token selection management
  const {
    selectedSourceToken,
    selectedTargetToken,
    setSelectedSourceToken,
    setSelectedTargetToken,
    availableSourceTokens,
    availableTargetTokens,
  } = useTokenSelection()

  // Token price fetching and calculations
  const {
    sourceAmount,
    targetAmount,
    tokenData,
    loading,
    error,
  } = useTokenPrices({
    usdAmount,
    sourceTokenSymbol: selectedSourceToken,
    targetTokenSymbol: selectedTargetToken,
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <Card className="border-2 shadow-xl">
          <CardContent className="p-6 md:p-8">
            {/* Header */}
            <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Token Price Explorer
            </h1>

            {/* Supported Tokens List */}
            <SupportedTokensList tokens={TOKENS} />

            {/* Error Display */}
            <ErrorDisplay error={error} />

            {/* Token Comparison Cards */}
            <div className="flex flex-col md:flex-row gap-4 items-center overflow-x-auto">
              {/* Source Token Card */}
              <TokenCard
                variant="source"
                loading={loading}
                amount={sourceAmount}
                selectedToken={selectedSourceToken}
                onTokenChange={setSelectedSourceToken}
                availableTokens={availableSourceTokens}
                tokenData={tokenData[selectedSourceToken]}
                usdAmount={usdAmount}
                onUsdAmountChange={setUsdAmount}
              />

              {/* Arrow */}
              <div className="flex justify-center md:mx-2 shrink-0 transform rotate-90 md:rotate-0">
                <ArrowRight className="h-8 w-8 text-muted-foreground" />
              </div>

              {/* Target Token Card */}
              <TokenCard
                variant="target"
                loading={loading}
                amount={targetAmount}
                selectedToken={selectedTargetToken}
                onTokenChange={setSelectedTargetToken}
                availableTokens={availableTargetTokens}
                tokenData={tokenData[selectedTargetToken]}
              />
            </div>

            {/* Exchange Rate Display */}
            <ExchangeRateDisplay
              sourceToken={selectedSourceToken}
              targetToken={selectedTargetToken}
              sourceTokenData={tokenData[selectedSourceToken]}
              targetTokenData={tokenData[selectedTargetToken]}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}