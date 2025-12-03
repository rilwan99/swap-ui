import {
  getAssetErc20ByChainAndSymbol,
  getAssetPriceInfo,
} from "@funkit/api-base";

export async function GET(request: Request) {
  const symbol = "ETH";
  const chainId = "1";
  const apiKey = process.env.FUN_API_KEY ?? "default";

  try {
    const tokenInfo = await getAssetErc20ByChainAndSymbol({
      chainId,
      symbol,
      apiKey: apiKey,
    });
    // {"tokenInfo":{"address":"0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee","chain":"1","decimals":18,"name":"Ether","symbol":"ETH"}

    const tokenPrice = await getAssetPriceInfo({
      chainId,
      assetTokenAddress: tokenInfo.address,
      apiKey: apiKey,
    });
    // "tokenPrice":{"unitPrice":3044.8162,"amount":1,"total":3044.8162}

    return Response.json({ tokenInfo, tokenPrice });
  } catch (error) {
    return Response.json(
      { error: "Failed to get asset details" },
      { status: 500 }
    );
  }
}
