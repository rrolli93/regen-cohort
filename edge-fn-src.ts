import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const TELEGRAM_BOT_TOKEN = "8567327083:AAGpxqAqgxd4oRquVvUDfMU6AqTo-MSO0Kc";
const TELEGRAM_CHAT_ID = "1579384230";

Deno.serve(async (req: Request) => {
  try {
    const payload = await req.json();
    const record = payload.record;
    if (!record) return new Response("no record", { status: 200 });

    const { name, email, country, why_join, prior_stem_cell, created_at } = record;
    const stem = prior_stem_cell === true ? "Yes" : prior_stem_cell === false ? "No" : "—";
    const ts = created_at ? new Date(created_at).toLocaleString("en-GB", { timeZone: "UTC" }) : "now";

    const msg = [
      "🧬 *New REGEN COHORT Application*",
      "",
      ,
      ,
      ,
      ,
      "",
      "*Why they want in:*",
      ,
      "",
      ,
    ].join("
");

    await fetch(
      ,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: TELEGRAM_CHAT_ID, text: msg, parse_mode: "Markdown" }),
      }
    );

    return new Response(JSON.stringify({ ok: true }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500, headers: { "Content-Type": "application/json" },
    });
  }
});

function esc(s: string | null | undefined): string {
  if (!s) return "";
  return s.replace(/[_*[\\]()~`>#+\-=|{}.!]/g, "\\$&");
}
