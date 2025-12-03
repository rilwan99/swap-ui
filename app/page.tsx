'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ArrowRight, Loader2 } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

// Token configuration
const TOKENS = [
  {
    symbol: 'USDC',
    chainId: '1',
    name: 'USD Coin',
    image: 'https://wsrv.nl/?w=24&h=24&url=https%3A%2F%2Fraw.githubusercontent.com%2Fsolana-labs%2Ftoken-list%2Fmain%2Fassets%2Fmainnet%2FEPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v%2Flogo.png&dpr=2&quality=80'
  },
  {
    symbol: 'USDT',
    chainId: '137',
    name: 'Tether',
    image: 'https://wsrv.nl/?w=24&h=24&url=https%3A%2F%2Fraw.githubusercontent.com%2Fsolana-labs%2Ftoken-list%2Fmain%2Fassets%2Fmainnet%2FEs9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB%2Flogo.svg&dpr=2&quality=80'
  },
  {
    symbol: 'ETH',
    chainId: '8453',
    name: 'Ethereum',
    image: 'https://wsrv.nl/?w=24&h=24&url=https%3A%2F%2Fraw.githubusercontent.com%2Fsolana-labs%2Ftoken-list%2Fmain%2Fassets%2Fmainnet%2F7vfCXTUXx5WJV5JADk17DUJ4ksgau7utNKj4b963voxs%2Flogo.png&dpr=2&quality=80'
  },
  {
    symbol: 'WBTC',
    chainId: '1',
    name: 'Wrapped Bitcoin',
    image: 'https://wsrv.nl/?w=24&h=24&url=https%3A%2F%2Fraw.githubusercontent.com%2Fsolana-labs%2Ftoken-list%2Fmain%2Fassets%2Fmainnet%2F3NZ9JMVBmGAqocybic2c7LQCJScmgsAZ6vQqTDzcqmJh%2Flogo.png&dpr=2&quality=80'
  },
]

interface TokenData {
  symbol: string
  chainId: string
  address: string
  price: number
}

export default function TokenPriceExplorer() {
  // Customizable tokens with defaults: USDC -> ETH
  const [selectedSourceToken, setSelectedSourceToken] = useState<string>('USDC')
  const [selectedTargetToken, setSelectedTargetToken] = useState<string>('ETH')

  const [usdAmount, setUsdAmount] = useState<string>('')
  const [sourceAmount, setSourceAmount] = useState<string>('0')
  const [targetAmount, setTargetAmount] = useState<string>('0')
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>('')

  const [tokenData, setTokenData] = useState<Record<string, TokenData>>({})

  // Get available tokens for each dropdown (excluding the other selected token)
  const availableSourceTokens = TOKENS.filter(t => t.symbol !== selectedTargetToken)
  const availableTargetTokens = TOKENS.filter(t => t.symbol !== selectedSourceToken)

  // Fetch token prices dynamically when USD amount or tokens change
  useEffect(() => {
    const fetchTokenPrices = async () => {
      // Only fetch if user has entered an amount
      if (!usdAmount || parseFloat(usdAmount) <= 0) {
        setSourceAmount('0')
        setTargetAmount('0')
        setTokenData({})
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

        // Fetch source token data
        const sourceResponse = await fetch(`/api/token-price?symbol=${selectedSourceToken}&chainId=${sourceToken.chainId}`)
        if (!sourceResponse.ok) throw new Error('Failed to fetch source token data')
        const sourceData = await sourceResponse.json()

        // Fetch target token data
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

        // Calculate token amounts from USD value
        const usdValue = parseFloat(usdAmount)
        const sourceTokenAmount = usdValue / sourceData.tokenPrice.unitPrice
        const targetTokenAmount = usdValue / targetData.tokenPrice.unitPrice

        setSourceAmount(sourceTokenAmount.toFixed(6))
        setTargetAmount(targetTokenAmount.toFixed(6))

      } catch (err) {
        setError('Failed to fetch token prices. Please try again.')
        console.error('Error fetching token data:', err)
        setSourceAmount('0')
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
  }, [usdAmount, selectedSourceToken, selectedTargetToken])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <Card className="border-2 shadow-xl">
          <CardContent className="p-6 md:p-8">
            {/* Header */}
            <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Token Price Explorer
            </h1>

            {/* Available Tokens Display */}
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {TOKENS.map((token) => (
                <Card key={token.symbol} className="border">
                  <CardContent className="px-1 px-4">
                    <div className="flex items-center gap-2">
                      <img
                        src={token.image}
                        alt={token.symbol}
                        className="w-6 h-6 rounded-full"
                      />
                      <p className="font-bold text-sm">{token.symbol}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Error Display */}
            {error && (
              <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-md text-red-700 text-sm">
                {error}
              </div>
            )}

            {/* Token Comparison Cards */}
            <div className="flex flex-col md:flex-row gap-4 items-center overflow-x-auto">
              {/* Source Token Card */}
              <Card className="w-full md:flex-1 border-2 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {/* USD Amount Input */}
                    <div>
                      <Label htmlFor="usd-amount" className="text-xs font-medium text-muted-foreground mb-2 block">
                        Enter USD Amount
                      </Label>
                      <Input
                        id="usd-amount"
                        type="number"
                        value={usdAmount}
                        onChange={(e) => setUsdAmount(e.target.value)}
                        placeholder="0.00"
                        className="h-12"
                        min="0"
                        step="0.01"
                      />
                    </div>

                    {/* Token Amount Display with Integrated Selector */}
                    <div>
                      <Label htmlFor="source-token" className="text-xs font-medium text-muted-foreground mb-2 block">
                        From
                      </Label>
                      {loading ? (
                        <div className="flex items-center gap-2 h-12">
                          <Loader2 className="h-5 w-5 animate-spin" />
                          <span className="text-sm">Calculating...</span>
                        </div>
                      ) : (
                        <div className="h-12 flex items-center justify-between px-3 bg-background/50 rounded-md border gap-2">
                          <p className="text-xl font-bold break-all flex-1">
                            {sourceAmount}
                          </p>
                          <Select
                            value={selectedSourceToken}
                            onValueChange={setSelectedSourceToken}
                          >
                            <SelectTrigger id="source-token" className="w-[120px] h-8 text-sm font-semibold border-0 bg-background shadow-sm">
                              <SelectValue placeholder="Select token" />
                            </SelectTrigger>
                            <SelectContent>
                              {availableSourceTokens.map((token) => (
                                <SelectItem key={token.symbol} value={token.symbol}>
                                  <div className="flex items-center gap-2">
                                    <img
                                      src={token.image}
                                      alt={token.symbol}
                                      className="w-4 h-4 rounded-full"
                                    />
                                    <span className="font-semibold">{token.symbol}</span>
                                  </div>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      )}
                    </div>

                    {/* Price Display */}
                    <div>
                      {loading ? (
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Loader2 className="h-4 w-4 animate-spin" />
                          <span className="text-sm">Loading...</span>
                        </div>
                      ) : (
                        <p className="text-sm text-muted-foreground font-medium">
                          ${tokenData[selectedSourceToken]?.price.toFixed(4) || '—'}
                        </p>
                      )}
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
                    {/* Token Amount Display with Integrated Selector */}
                    <div>
                      <Label htmlFor="target-token" className="text-xs font-medium text-muted-foreground mb-2 block">
                        To
                      </Label>
                      {loading ? (
                        <div className="flex items-center gap-2 h-12">
                          <Loader2 className="h-5 w-5 animate-spin" />
                          <span className="text-sm">Calculating...</span>
                        </div>
                      ) : (
                        <div className="h-12 flex items-center justify-between px-3 bg-background/50 rounded-md border gap-2">
                          <p className="text-xl font-bold break-all flex-1">
                            {targetAmount}
                          </p>
                          <Select
                            value={selectedTargetToken}
                            onValueChange={setSelectedTargetToken}
                          >
                            <SelectTrigger id="target-token" className="w-[120px] h-8 text-sm font-semibold border-0 bg-background shadow-sm">
                              <SelectValue placeholder="Select token" />
                            </SelectTrigger>
                            <SelectContent>
                              {availableTargetTokens.map((token) => (
                                <SelectItem key={token.symbol} value={token.symbol}>
                                  <div className="flex items-center gap-2">
                                    <img
                                      src={token.image}
                                      alt={token.symbol}
                                      className="w-4 h-4 rounded-full"
                                    />
                                    <span className="font-semibold">{token.symbol}</span>
                                  </div>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      )}
                    </div>

                    {/* Price Display */}
                    <div>
                      {loading ? (
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Loader2 className="h-4 w-4 animate-spin" />
                          <span className="text-sm">Loading...</span>
                        </div>
                      ) : (
                        <p className="text-sm text-muted-foreground font-medium">
                          ${tokenData[selectedTargetToken]?.price.toFixed(4) || '—'}
                        </p>
                      )}
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