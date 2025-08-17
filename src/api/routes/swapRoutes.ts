import { getBuyWithCryptoQuote } from "thirdweb/pay";
import { createThirdwebClient } from "thirdweb";

// POST: swap/bridge quote & tx
export async function POST(req: Request) {
  const params = await req.json();
  const client = createThirdwebClient({
    clientId: process.env.THIRDWEB_CLIENT_ID,
  });
  const quote = await getBuyWithCryptoQuote({ ...params, client });
  return Response.json(quote);
}
// GET: swap status (optional)
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const txHash = searchParams.get("txHash");
  return Response.json({ status: "pending", hash: txHash });
}
