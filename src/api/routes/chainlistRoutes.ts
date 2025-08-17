import chainlist from "./chainlist.json";
export async function GET() {
  return Response.json(chainlist);
}
