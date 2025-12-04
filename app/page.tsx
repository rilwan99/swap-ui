'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowRight } from 'lucide-react'
import { TOKENS } from '@/lib/config'
import { useTokenSelection } from '@/hooks/useTokenSelection'
import { useTokenPrices } from '@/hooks/useTokenPrices'
import { SupportedTokensList, TokenCard, ExchangeRateDisplay } from '@/components/token'
import { ErrorDisplay } from '@/components/common'
import { ThemeToggle } from '@/components/theme'

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
    <div className="min-h-screen relative overflow-hidden p-4 md:p-8 transition-colors duration-300">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url(/background3.jpg)' }}
        />
        {/* Gradient Overlay for better readability and theme integration */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/70 via-blue-50/60 to-purple-50/70 dark:from-slate-950/60 dark:via-blue-950/50 dark:to-purple-950/60" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="flex justify-end mb-4">
          <ThemeToggle />
        </div>
        <Card className="border-2 shadow-2xl backdrop-blur-sm bg-card/90 transition-all duration-300">
          <CardContent className="p-6 md:p-8">
            {/* Header */}
            <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 bg-gradient-to-r from-primary via-purple-600 to-blue-600 dark:from-primary dark:via-secondary dark:to-accent bg-clip-text text-transparent animate-in fade-in slide-in-from-top-4 duration-700">
              Token Price Explorer
            </h1>

            {/* Supported Tokens List */}
            <SupportedTokensList tokens={TOKENS} />

            {/* Error Display */}
            <ErrorDisplay error={error} />

            {/* Token Comparison Cards */}
            <div className="flex flex-col md:flex-row gap-4 items-center">
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
                <ArrowRight className="h-8 w-8 text-primary/60 hover:text-primary transition-all duration-300 animate-pulse" />
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
              loading={loading}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}