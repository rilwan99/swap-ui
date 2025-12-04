/**
 * Application Configuration
 * General app-wide constants and configuration values
 */

/**
 * API request debounce delay in milliseconds
 */
export const API_DEBOUNCE_DELAY = 500;

/**
 * Number of decimal places for token amounts
 */
export const TOKEN_AMOUNT_DECIMALS = 6;

/**
 * Number of decimal places for token prices
 */
export const TOKEN_PRICE_DECIMALS = 4;

/**
 * React Query configuration
 */
export const QUERY_CONFIG = {
  staleTime: 30 * 1000, // 30 seconds
  gcTime: 5 * 60 * 1000, // 5 minutes
  retry: 2,
  retryDelay: 1000,
} as const;
