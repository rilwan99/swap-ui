/**
 * Calculation Service
 * Handles all token-related calculations
 */

/**
 * Calculates token amount based on USD value and token price
 * @param usdValue - USD amount to convert
 * @param tokenPrice - Current price of the token in USD
 * @param decimals - Number of decimal places to round to (default: 6)
 * @returns Formatted token amount as string
 */
export const calculateTokenAmount = (
  usdValue: number,
  tokenPrice: number,
  decimals: number = 6
): string => {
  const amount = usdValue / tokenPrice;
  return amount.toFixed(decimals);
};

/**
 * Calculates exchange rate between two tokens
 * @param sourceTokenPrice - Price of the source token in USD
 * @param targetTokenPrice - Price of the target token in USD
 * @param decimals - Number of decimal places to round to (default: 6)
 * @returns Formatted exchange rate as string
 */
export const calculateExchangeRate = (
  sourceTokenPrice: number,
  targetTokenPrice: number,
  decimals: number = 6
): string => {
  const rate = sourceTokenPrice / targetTokenPrice;
  return rate.toFixed(decimals);
};
