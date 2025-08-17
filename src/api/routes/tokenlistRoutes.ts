import tokenlist from "./tokenlist.json";
export async function GET() {
  return Response.json(tokenlist);
}
