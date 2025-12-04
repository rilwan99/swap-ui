import {
  getAssetErc20ByChainAndSymbol,
  getAssetPriceInfo,
} from "@funkit/api-base";
import { validateInternalRequest } from "@/lib/apiSecurity";

export async function GET(request: Request) {
  // Security Check
  const validation = await validateInternalRequest();
  if (!validation.isValid) {
    return Response.json({ error: validation.error }, { status: 403 });
  }

  const { searchParams } = new URL(request.url);
  const symbol = searchParams.get("symbol") || "ETH";
  const chainId = searchParams.get("chainId") || "1";
  const apiKey = process.env.FUN_API_KEY ?? "default";

  try {
    const tokenInfo = await getAssetErc20ByChainAndSymbol({
      chainId,
      symbol,
      apiKey: apiKey,
    });

    const tokenPrice = await getAssetPriceInfo({
      chainId,
      assetTokenAddress: tokenInfo.address,
      apiKey: apiKey,
    });

    return Response.json({ tokenInfo, tokenPrice });
  } catch (error) {
    console.error("Error fetching token data:", error);
    return Response.json(
      { error: "Failed to get asset details" },
      { status: 500 }
    );
  }
}
