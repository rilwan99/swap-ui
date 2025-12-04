import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchTokenPrice, calculateTokenAmount } from "@/lib/services";
import {
  TOKENS,
  API_DEBOUNCE_DELAY,
  TOKEN_AMOUNT_DECIMALS,
} from "@/lib/config";
import type { TokenData } from "@/lib/types";
import { useDebounce } from "./useDebounce";

interface UseTokenPricesParams {
  usdAmount: string;
  sourceTokenSymbol: string;
  targetTokenSymbol: string;
}

interface UseTokenPricesReturn {
  sourceAmount: string;
  targetAmount: string;
  tokenData: Record<string, TokenData>;
  loading: boolean;
  error: string;
}

/**
 * Hook to fetch and calculate token prices based on USD input
 * Uses React Query for caching, automatic retries, and request deduplication
 * Includes debouncing to prevent excessive API calls
 */
export const useTokenPrices = ({
  usdAmount,
  sourceTokenSymbol,
  targetTokenSymbol,
}: UseTokenPricesParams): UseTokenPricesReturn => {
  // Debounce the USD amount to prevent excessive API calls while user types
  const debouncedAmount = useDebounce(usdAmount, API_DEBOUNCE_DELAY);

  const numericAmount = parseFloat(debouncedAmount);
  const isValidAmount = !isNaN(numericAmount) && numericAmount > 0;

  // Find token configurations
  const sourceToken = TOKENS.find((t) => t.symbol === sourceTokenSymbol);
  const targetToken = TOKENS.find((t) => t.symbol === targetTokenSymbol);

  // Fetch source token price with React Query
  const {
    data: sourceData,
    isLoading: sourceLoading,
    error: sourceError,
  } = useQuery({
    queryKey: ["tokenPrice", sourceTokenSymbol, sourceToken?.chainId],
    queryFn: async () => {
      if (!sourceToken) {
        throw new Error(`Token configuration not found for ${sourceTokenSymbol}`);
      }
      return fetchTokenPrice(sourceTokenSymbol, sourceToken.chainId);
    },
    enabled: isValidAmount && !!sourceToken,
    staleTime: 30 * 1000, // Consider data fresh for 30 seconds
    retry: 2, // Retry failed requests twice
  });

  // Fetch target token price with React Query
  const {
    data: targetData,
    isLoading: targetLoading,
    error: targetError,
  } = useQuery({
    queryKey: ["tokenPrice", targetTokenSymbol, targetToken?.chainId],
    queryFn: async () => {
      if (!targetToken) {
        throw new Error(`Token configuration not found for ${targetTokenSymbol}`);
      }
      return fetchTokenPrice(targetTokenSymbol, targetToken.chainId);
    },
    enabled: isValidAmount && !!targetToken,
    staleTime: 30 * 1000,
    retry: 2,
  });

  // Calculate token amounts and prepare token data
  const result = useMemo(() => {
    if (!isValidAmount || !sourceData || !targetData || !sourceToken || !targetToken) {
      return {
        sourceAmount: "0",
        targetAmount: "0",
        tokenData: {},
      };
    }

    const sourcePrice = sourceData.tokenPrice.unitPrice;
    const targetPrice = targetData.tokenPrice.unitPrice;

    return {
      sourceAmount: calculateTokenAmount(
        numericAmount,
        sourcePrice,
        TOKEN_AMOUNT_DECIMALS
      ),
      targetAmount: calculateTokenAmount(
        numericAmount,
        targetPrice,
        TOKEN_AMOUNT_DECIMALS
      ),
      tokenData: {
        [sourceTokenSymbol]: {
          symbol: sourceTokenSymbol,
          chainId: sourceToken.chainId,
          address: sourceData.tokenInfo.address,
          price: sourcePrice,
        },
        [targetTokenSymbol]: {
          symbol: targetTokenSymbol,
          chainId: targetToken.chainId,
          address: targetData.tokenInfo.address,
          price: targetPrice,
        },
      },
    };
  }, [
    isValidAmount,
    numericAmount,
    sourceData,
    targetData,
    sourceToken,
    targetToken,
    sourceTokenSymbol,
    targetTokenSymbol,
  ]);

  // Combine loading and error states
  const loading = sourceLoading || targetLoading;
  const error = sourceError?.message || targetError?.message || "";

  return {
    ...result,
    loading,
    error,
  };
};
