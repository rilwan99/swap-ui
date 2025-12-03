'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ArrowRight, Loader2 } from 'lucide-react'

// Token configuration
const TOKENS = [
  { symbol: 'USDC', chainId: '1', name: 'USD Coin' },
  { symbol: 'USDT', chainId: '137', name: 'Tether' },
  { symbol: 'ETH', chainId: '8453', name: 'Ethereum' },
  { symbol: 'WBTC', chainId: '1', name: 'Wrapped Bitcoin' },
]

interface TokenData {
  symbol: string
  chainId: string
  address: string
  price: number
}

export default function TokenPriceExplorer() {
  // Fixed tokens: USDC -> ETH
  const selectedSourceToken = 'USDC'
  const selectedTargetToken = 'ETH'

  const [sourceAmount, setSourceAmount] = useState<string>('')
  const [targetAmount, setTargetAmount] = useState<string>('0')
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>('')

  const [tokenData, setTokenData] = useState<Record<string, TokenData>>({})

  // Fetch token prices dynamically when source amount changes
  useEffect(() => {
    const fetchTokenPrices = async () => {
      // Only fetch if user has entered an amount
      if (!sourceAmount || parseFloat(sourceAmount) <= 0) {
        setTargetAmount('0')
        return
      }

      setLoading(true)
      setError('')

      try {
        const sourceToken = TOKENS.find(t => t.symbol === selectedSourceToken)
        const targetToken = TOKENS.find(t => t.symbol === selectedTargetToken)

        if (!sourceToken || !targetToken) {
          throw new Error('Token configuration not found')
        }

        // Fetch source token (USDC) data
        const sourceResponse = await fetch(`/api/token-price?symbol=${selectedSourceToken}&chainId=${sourceToken.chainId}`)
        if (!sourceResponse.ok) throw new Error('Failed to fetch source token data')
        const sourceData = await sourceResponse.json()

        // Fetch target token (ETH) data
        const targetResponse = await fetch(`/api/token-price?symbol=${selectedTargetToken}&chainId=${targetToken.chainId}`)
        if (!targetResponse.ok) throw new Error('Failed to fetch target token data')
        const targetData = await targetResponse.json()

        // Update token data
        const newTokenData = {
          [selectedSourceToken]: {
            symbol: selectedSourceToken,
            chainId: sourceToken.chainId,
            address: sourceData.tokenInfo.address,
            price: sourceData.tokenPrice.unitPrice,
          },
          [selectedTargetToken]: {
            symbol: selectedTargetToken,
            chainId: targetToken.chainId,
            address: targetData.tokenInfo.address,
            price: targetData.tokenPrice.unitPrice,
          },
        }
        setTokenData(newTokenData)

        // Calculate target amount
        const sourceAmountNum = parseFloat(sourceAmount)
        const sourceValueInUSD = sourceAmountNum * sourceData.tokenPrice.unitPrice
        const targetAmountNum = sourceValueInUSD / targetData.tokenPrice.unitPrice
        setTargetAmount(targetAmountNum.toFixed(6))

      } catch (err) {
        setError('Failed to fetch token prices. Please try again.')
        console.error('Error fetching token data:', err)
        setTargetAmount('0')
      } finally {
        setLoading(false)
      }
    }

    // Debounce the API call (1s)
    const timeoutId = setTimeout(() => {
      fetchTokenPrices()
    }, 1000)

    return () => clearTimeout(timeoutId)
  }, [sourceAmount, selectedSourceToken, selectedTargetToken])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <Card className="border-2 shadow-xl">
          <CardContent className="p-6 md:p-8">
            {/* Header */}
            <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Token Price Explorer
            </h1>

            {/* Fixed Swap Direction */}
            <div className="text-center mb-8">
              <p className="text-lg text-muted-foreground">
                Swap <span className="font-bold text-blue-600">{selectedSourceToken}</span> → <span className="font-bold text-purple-600">{selectedTargetToken}</span>
              </p>
            </div>

            {/* Source Amount Input */}
            <div className="mb-6">
              <Label htmlFor="source-amount" className="text-sm font-medium mb-2 block">
                {selectedSourceToken} Amount
              </Label>
              <Input
                id="source-amount"
                type="number"
                value={sourceAmount}
                onChange={(e) => setSourceAmount(e.target.value)}
                placeholder={`Enter ${selectedSourceToken} amount`}
                className="text-lg"
                min="0"
                step="0.01"
              />
            </div>

            {/* Error Display */}
            {error && (
              <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-md text-red-700 text-sm">
                {error}
              </div>
            )}

            {/* Token Comparison Cards */}
            {/* Token Comparison Cards */}
            <div className="flex flex-col md:flex-row gap-4 items-center overflow-x-auto">
              {/* Source Token Card */}
              <Card className="w-full md:flex-1 border-2 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div>
                      <Label className="text-xs font-medium text-muted-foreground mb-1 block">
                        From
                      </Label>
                      <div className="w-full text-xl font-bold">
                        {selectedSourceToken}
                      </div>
                    </div>

                    <div>
                      <Label className="text-xs font-medium text-muted-foreground mb-1 block">
                        Amount
                      </Label>
                      {loading ? (
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Loader2 className="h-4 w-4 animate-spin" />
                          <span className="text-sm">Loading...</span>
                        </div>
                      ) : (
                        <p className="text-2xl font-bold break-all">
                          {sourceAmount}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label className="text-xs font-medium text-muted-foreground mb-1 block">
                        Price
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        ${tokenData[selectedSourceToken]?.price.toFixed(4) || '—'}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Arrow */}
              <div className="flex justify-center md:mx-2 shrink-0 transform rotate-90 md:rotate-0">
                <ArrowRight className="h-8 w-8 text-muted-foreground" />
              </div>

              {/* Target Token Card */}
              <Card className="w-full md:flex-1 border-2 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div>
                      <Label className="text-xs font-medium text-muted-foreground mb-1 block">
                        To
                      </Label>
                      <div className="w-full text-xl font-bold">
                        {selectedTargetToken}
                      </div>
                    </div>

                    <div>
                      <Label className="text-xs font-medium text-muted-foreground mb-1 block">
                        Amount
                      </Label>
                      {loading ? (
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Loader2 className="h-4 w-4 animate-spin" />
                          <span className="text-sm">Loading...</span>
                        </div>
                      ) : (
                        <p className="text-2xl font-bold break-all">
                          {targetAmount}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label className="text-xs font-medium text-muted-foreground mb-1 block">
                        Price
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        ${tokenData[selectedTargetToken]?.price.toFixed(4) || '—'}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Exchange Rate Info */}
            {tokenData[selectedSourceToken] && tokenData[selectedTargetToken] && (
              <div className="mt-6 p-4 bg-muted rounded-lg text-center">
                <p className="text-sm text-muted-foreground">
                  1 {selectedSourceToken} ≈{' '}
                  <span className="font-semibold">
                    {(tokenData[selectedSourceToken].price / tokenData[selectedTargetToken].price).toFixed(6)}
                  </span>{' '}
                  {selectedTargetToken}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}