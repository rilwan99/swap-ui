import { useState, useEffect } from "react";
import { fetchTokenPrice, calculateTokenAmount } from "@/lib/api";
import {
  TOKENS,
  API_DEBOUNCE_DELAY,
  TOKEN_AMOUNT_DECIMALS,
} from "@/lib/constants";
import type { TokenData } from "@/lib/types";

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
 * Includes debouncing to prevent excessive API calls
 */
export const useTokenPrices = ({
  usdAmount,
  sourceTokenSymbol,
  targetTokenSymbol,
}: UseTokenPricesParams): UseTokenPricesReturn => {
  const [sourceAmount, setSourceAmount] = useState<string>("0");
  const [targetAmount, setTargetAmount] = useState<string>("0");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [tokenData, setTokenData] = useState<Record<string, TokenData>>({});

  useEffect(() => {
    const fetchTokenPrices = async () => {
      // Only fetch if user has entered an amount
      if (!usdAmount || parseFloat(usdAmount) <= 0) {
        setSourceAmount("0");
        setTargetAmount("0");
        setTokenData({});
        return;
      }

      setLoading(true);
      setError("");

      try {
        const sourceToken = TOKENS.find((t) => t.symbol === sourceTokenSymbol);
        const targetToken = TOKENS.find((t) => t.symbol === targetTokenSymbol);

        if (!sourceToken || !targetToken) {
          throw new Error("Token configuration not found");
        }

        // Fetch both token prices in parallel
        const [sourceData, targetData] = await Promise.all([
          fetchTokenPrice(sourceTokenSymbol, sourceToken.chainId),
          fetchTokenPrice(targetTokenSymbol, targetToken.chainId),
        ]);

        // Update token data
        const newTokenData = {
          [sourceTokenSymbol]: {
            symbol: sourceTokenSymbol,
            chainId: sourceToken.chainId,
            address: sourceData.tokenInfo.address,
            price: sourceData.tokenPrice.unitPrice,
          },
          [targetTokenSymbol]: {
            symbol: targetTokenSymbol,
            chainId: targetToken.chainId,
            address: targetData.tokenInfo.address,
            price: targetData.tokenPrice.unitPrice,
          },
        };
        setTokenData(newTokenData);

        // Calculate token amounts from USD value
        const usdValue = parseFloat(usdAmount);
        const sourceTokenAmount = calculateTokenAmount(
          usdValue,
          sourceData.tokenPrice.unitPrice,
          TOKEN_AMOUNT_DECIMALS
        );
        const targetTokenAmount = calculateTokenAmount(
          usdValue,
          targetData.tokenPrice.unitPrice,
          TOKEN_AMOUNT_DECIMALS
        );

        setSourceAmount(sourceTokenAmount);
        setTargetAmount(targetTokenAmount);
      } catch (err) {
        setError("Failed to fetch token prices. Please try again.");
        console.error("Error fetching token data:", err);
        setSourceAmount("0");
        setTargetAmount("0");
      } finally {
        setLoading(false);
      }
    };

    // Debounce the API call
    const timeoutId = setTimeout(() => {
      fetchTokenPrices();
    }, API_DEBOUNCE_DELAY);

    return () => clearTimeout(timeoutId);
  }, [usdAmount, sourceTokenSymbol, targetTokenSymbol]);

  return {
    sourceAmount,
    targetAmount,
    tokenData,
    loading,
    error,
  };
};
