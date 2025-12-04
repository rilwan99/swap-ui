import type { TokenPriceResponse } from "@/lib/types";

/**
 * Token Service
 * Handles all token-related API calls and business logic
 */

/**
 * Fetches token price data from the API
 * @param symbol - Token symbol (e.g., 'USDC', 'ETH')
 * @param chainId - Blockchain chain ID
 * @returns Token price response data
 * @throws Error if the fetch fails
 */
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
