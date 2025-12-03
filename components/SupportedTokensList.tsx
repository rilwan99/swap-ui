import { Card, CardContent } from '@/components/ui/card'
import type { Token } from '@/lib/types'

interface SupportedTokensListProps {
  tokens: Token[]
}

export const SupportedTokensList = ({ tokens }: SupportedTokensListProps) => {
  return (
    <div className="mb-8">
      <p className="text-sm text-muted-foreground text-center mb-3 font-medium">
        Supported Tokens
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        {tokens.map((token) => (
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
    </div>
  )
}
