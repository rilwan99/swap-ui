import { useState, useMemo } from "react";
import {
  TOKENS,
  DEFAULT_SOURCE_TOKEN,
  DEFAULT_TARGET_TOKEN,
} from "@/lib/config";
import type { Token } from "@/lib/types";

interface UseTokenSelectionReturn {
  selectedSourceToken: string;
  selectedTargetToken: string;
  setSelectedSourceToken: (symbol: string) => void;
  setSelectedTargetToken: (symbol: string) => void;
  availableSourceTokens: Token[];
  availableTargetTokens: Token[];
}

/**
 * Hook to manage token selection state and available token lists
 * Ensures source and target tokens are always different
 */
export const useTokenSelection = (): UseTokenSelectionReturn => {
  const [selectedSourceToken, setSelectedSourceToken] =
    useState<string>(DEFAULT_SOURCE_TOKEN);
  const [selectedTargetToken, setSelectedTargetToken] =
    useState<string>(DEFAULT_TARGET_TOKEN);

  // Get available tokens for each dropdown (excluding the other selected token)
  const availableSourceTokens = useMemo(
    () => TOKENS.filter((t) => t.symbol !== selectedTargetToken),
    [selectedTargetToken]
  );

  const availableTargetTokens = useMemo(
    () => TOKENS.filter((t) => t.symbol !== selectedSourceToken),
    [selectedSourceToken]
  );

  return {
    selectedSourceToken,
    selectedTargetToken,
    setSelectedSourceToken,
    setSelectedTargetToken,
    availableSourceTokens,
    availableTargetTokens,
  };
};
