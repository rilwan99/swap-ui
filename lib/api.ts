import type { TokenPriceResponse } from "./types";

// Fetches token price data from the API
export const fetchTokenPrice = async (
  symbol: string,
  chainId: string
): Promise<TokenPriceResponse> => {
  const response = await fetch(
    `/api/token-price?symbol=${symbol}&chainId=${chainId}`,
    {
      headers: {
        "x-internal-request": process.env.NEXT_PUBLIC_INTERNAL_API_SECRET || "",
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch ${symbol} token data`);
  }

  return response.json();
};

// Calculates token amount based on USD value and token price
export const calculateTokenAmount = (
  usdValue: number,
  tokenPrice: number,
  decimals: number = 6
): string => {
  const amount = usdValue / tokenPrice;
  return amount.toFixed(decimals);
};

// Calculates exchange rate between two tokens
export const calculateExchangeRate = (
  sourceTokenPrice: number,
  targetTokenPrice: number,
  decimals: number = 6
): string => {
  const rate = sourceTokenPrice / targetTokenPrice;
  return rate.toFixed(decimals);
};
