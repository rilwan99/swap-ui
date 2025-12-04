/**
 * Type definitions for the token swap application
 */

export interface Token {
  symbol: string;
  chainId: string;
  name: string;
  image: string;
  chainIdImage: string;
}

export interface TokenData {
  symbol: string;
  chainId: string;
  address: string;
  price: number;
}

export interface TokenPriceResponse {
  tokenInfo: {
    address: string;
  };
  tokenPrice: {
    unitPrice: number;
  };
}
