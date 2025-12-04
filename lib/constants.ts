import type { Token } from "./types";

/**
 * Supported tokens for the swap interface
 * Each token includes metadata for display and API interactions
 */
export const TOKENS: Token[] = [
  {
    symbol: "USDC",
    chainId: "1",
    chainIdImage:
      "https://wsrv.nl/?w=24&h=24&url=https%3A%2F%2Fraw.githubusercontent.com%2Fsolana-labs%2Ftoken-list%2Fmain%2Fassets%2Fmainnet%2F7vfCXTUXx5WJV5JADk17DUJ4ksgau7utNKj4b963voxs%2Flogo.png&dpr=2&quality=80",
    name: "USD Coin",
    image:
      "https://wsrv.nl/?w=24&h=24&url=https%3A%2F%2Fraw.githubusercontent.com%2Fsolana-labs%2Ftoken-list%2Fmain%2Fassets%2Fmainnet%2FEPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v%2Flogo.png&dpr=2&quality=80",
  },
  {
    symbol: "USDT",
    chainId: "137",
    chainIdImage:
      "https://wsrv.nl/?w=24&h=24&url=https%3A%2F%2Fbafkreidlnj7ne4bnygpn45x2k464vw7xzudib3vtecqwkczo4adbcnn2sm.ipfs.nftstorage.link%2F&dpr=2&quality=80",
    name: "Tether",
    image:
      "https://wsrv.nl/?w=24&h=24&url=https%3A%2F%2Fraw.githubusercontent.com%2Fsolana-labs%2Ftoken-list%2Fmain%2Fassets%2Fmainnet%2FEs9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB%2Flogo.svg&dpr=2&quality=80",
  },
  {
    symbol: "ETH",
    chainId: "8453",
    chainIdImage:
      "https://basescan.org/assets/base/images/svg/logos/chain-light.svg?v=25.11.4.0",
    name: "Ethereum",
    image:
      "https://wsrv.nl/?w=24&h=24&url=https%3A%2F%2Fraw.githubusercontent.com%2Fsolana-labs%2Ftoken-list%2Fmain%2Fassets%2Fmainnet%2F7vfCXTUXx5WJV5JADk17DUJ4ksgau7utNKj4b963voxs%2Flogo.png&dpr=2&quality=80",
  },
  {
    symbol: "WBTC",
    chainId: "1",
    chainIdImage:
      "https://wsrv.nl/?w=24&h=24&url=https%3A%2F%2Fraw.githubusercontent.com%2Fsolana-labs%2Ftoken-list%2Fmain%2Fassets%2Fmainnet%2F7vfCXTUXx5WJV5JADk17DUJ4ksgau7utNKj4b963voxs%2Flogo.png&dpr=2&quality=80",
    name: "Wrapped Bitcoin",
    image:
      "https://wsrv.nl/?w=24&h=24&url=https%3A%2F%2Fraw.githubusercontent.com%2Fsolana-labs%2Ftoken-list%2Fmain%2Fassets%2Fmainnet%2F3NZ9JMVBmGAqocybic2c7LQCJScmgsAZ6vQqTDzcqmJh%2Flogo.png&dpr=2&quality=80",
  },
];

// Map chainId to network name
export const CHAIN_NAMES: Record<string, string> = {
  "1": "Ethereum",
  "137": "Polygon",
  "8453": "Base",
};

/**
 * Default token selections
 */
export const DEFAULT_SOURCE_TOKEN = "USDC";
export const DEFAULT_TARGET_TOKEN = "ETH";

/**
 * API request debounce delay in milliseconds
 */
export const API_DEBOUNCE_DELAY = 1000;

/**
 * Number of decimal places for token amounts
 */
export const TOKEN_AMOUNT_DECIMALS = 6;

/**
 * Number of decimal places for token prices
 */
export const TOKEN_PRICE_DECIMALS = 4;
