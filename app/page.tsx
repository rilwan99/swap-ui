'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
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
  const [selectedSourceToken, setSelectedSourceToken] = useState<string>('USDC')
  const [selectedTargetToken, setSelectedTargetToken] = useState<string>('ETH')
  const [usdAmount, setUsdAmount] = useState<string>('100')
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>('')

  const [tokenData, setTokenData] = useState<Record<string, TokenData>>({})
  const [sourceAmount, setSourceAmount] = useState<string>('0')
  const [targetAmount, setTargetAmount] = useState<string>('0')

  // // Fetch token data on mount and when tokens change
  // useEffect(() => {
  //   fetchTokenData()
  // }, [selectedSourceToken, selectedTargetToken])

  // // Calculate amounts when USD amount changes
  // useEffect(() => {
  //   calculateAmounts()
  // }, [usdAmount, tokenData])

  // const fetchTokenData = async () => {
  //   setLoading(true)
  //   setError('')

  //   try {
  //     const tokens = [selectedSourceToken, selectedTargetToken]
  //     const uniqueTokens = [...new Set(tokens)]

  //     for (const symbol of uniqueTokens) {
  //       const tokenConfig = TOKENS.find(t => t.symbol === symbol)
  //       if (!tokenConfig) continue

  //       // Get token info
  //       const tokenInfo = await getAssetErc20ByChainAndSymbol({
  //         chainId: tokenConfig.chainId,
  //         symbol: symbol,
  //         apiKey: API_KEY,
  //       })

  //       if (tokenInfo && tokenInfo.address) {
  //         // Get price info
  //         const priceInfo = await getAssetPriceInfo({
  //           chainId: tokenConfig.chainId,
  //           assetTokenAddress: tokenInfo.address,
  //           apiKey: API_KEY,
  //         })

  //         setTokenData(prev => ({
  //           ...prev,
  //           [symbol]: {
  //             symbol,
  //             chainId: tokenConfig.chainId,
  //             address: tokenInfo.address,
  //             price: priceInfo?.price || 0,
  //           },
  //         }))
  //       }
  //     }
  //   } catch (err) {
  //     setError('Failed to fetch token data. Please try again.')
  //     console.error('Error fetching token data:', err)
  //   } finally {
  //     setLoading(false)
  //   }
  // }

  // const calculateAmounts = () => {
  //   const usd = parseFloat(usdAmount) || 0

  //   const sourceToken = tokenData[selectedSourceToken]
  //   const targetToken = tokenData[selectedTargetToken]

  //   if (sourceToken?.price) {
  //     const sourceQty = usd / sourceToken.price
  //     setSourceAmount(sourceQty.toFixed(6))
  //   }

  //   if (targetToken?.price) {
  //     const targetQty = usd / targetToken.price
  //     setTargetAmount(targetQty.toFixed(6))
  //   }
  // }

  // const handleTokenSelect = (token: string, type: 'source' | 'target') => {
  //   if (type === 'source') {
  //     if (token === selectedTargetToken) {
  //       // Swap if selecting the same token
  //       setSelectedTargetToken(selectedSourceToken)
  //     }
  //     setSelectedSourceToken(token)
  //   } else {
  //     if (token === selectedSourceToken) {
  //       // Swap if selecting the same token
  //       setSelectedSourceToken(selectedTargetToken)
  //     }
  //     setSelectedTargetToken(token)
  //   }
  // }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <Card className="border-2 shadow-xl">
          <CardContent className="p-6 md:p-8">
            {/* Header */}
            <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Token Price Explorer
            </h1>

            {/* Token Selection Buttons */}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {TOKENS.map((token) => (
                <Button
                  key={token.symbol}
                  variant={
                    selectedSourceToken === token.symbol || selectedTargetToken === token.symbol
                      ? 'default'
                      : 'outline'
                  }
                  className="min-w-[80px] font-semibold"
                // onClick={() => {
                //   // Smart selection: prioritize source token
                //   if (selectedSourceToken !== token.symbol && selectedTargetToken !== token.symbol) {
                //     handleTokenSelect(token.symbol, 'source')
                //   }
                // }}
                >
                  {token.symbol}
                </Button>
              ))}
            </div>

            {/* USD Input */}
            <div className="mb-6">
              <Label htmlFor="usd-amount" className="text-sm font-medium mb-2 block">
                USD Amount
              </Label>
              <Input
                id="usd-amount"
                type="number"
                value={usdAmount}
                onChange={(e) => setUsdAmount(e.target.value)}
                placeholder="Enter USD amount"
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
                      <Button
                        variant="ghost"
                        className="w-full justify-start text-xl font-bold p-0 h-auto hover:bg-transparent"
                      // onClick={() => {
                      //   const currentIndex = TOKENS.findIndex(t => t.symbol === selectedSourceToken)
                      //   const nextIndex = (currentIndex + 1) % TOKENS.length
                      //   handleTokenSelect(TOKENS[nextIndex].symbol, 'source')
                      // }}
                      >
                        {selectedSourceToken}
                      </Button>
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
                      <Button
                        variant="ghost"
                        className="w-full justify-start text-xl font-bold p-0 h-auto hover:bg-transparent"
                      // onClick={() => {
                      //   const currentIndex = TOKENS.findIndex(t => t.symbol === selectedTargetToken)
                      //   const nextIndex = (currentIndex + 1) % TOKENS.length
                      //   handleTokenSelect(TOKENS[nextIndex].symbol, 'target')
                      // }}
                      >
                        {selectedTargetToken}
                      </Button>
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