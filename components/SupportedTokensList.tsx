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
          <Card key={token.symbol} className="border border-primary/20 bg-gradient-to-br from-primary/5 to-secondary/5">
            <CardContent className="px-1 px-4">
              <div className="flex items-center gap-2">
                <img
                  src={token.image}
                  alt={token.symbol}
                  className="w-6 h-6 rounded-full ring-2 ring-primary/20"
                />
                <p className="font-bold text-sm bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">{token.symbol}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
