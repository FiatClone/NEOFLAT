import { providers } from "ethers";
import chainlist from "../chainlist/chainlist.json";
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const txHash = searchParams.get("txHash");
  const chainId = searchParams.get("chainId") || 1;
  const chain = chainlist.find((c) => c.id == chainId);
  const rpc = chain?.rpc?.[0];
  if (!rpc) return Response.json({ status: "unknown" });
  const provider = new providers.JsonRpcProvider(rpc);
  let rec;
  try {
    rec = await provider.getTransactionReceipt(txHash);
  } catch (e) {}
  if (!rec) return Response.json({ status: "pending", txHash });
  if (rec.status === 1) return Response.json({ status: "success", ...rec });
  if (rec.status === 0) return Response.json({ status: "failed", ...rec });
  return Response.json({ status: "unknown", ...rec });
}
