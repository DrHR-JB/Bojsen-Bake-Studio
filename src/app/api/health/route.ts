export const dynamic = "force-dynamic";

/** Health check til Railway (og andre platforme). */
export function GET() {
  return Response.json({ status: "ok", timestamp: new Date().toISOString() });
}
