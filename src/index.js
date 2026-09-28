export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // API para leer y guardar el estado del torneo
    if (url.pathname === "/api/state") {
      const corsHeaders = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type"
      };

      if (request.method === "OPTIONS") {
        return new Response(null, { status: 204, headers: corsHeaders });
      }

      if (request.method === "GET") {
        const headers = {
          "Content-Type": "application/json; charset=utf-8",
          "Cache-Control": "public, max-age=5, stale-while-revalidate=20",
          ...corsHeaders
        };
        try {
          if (!env || !env.TRUCO_KV) {
            return new Response(JSON.stringify({ error: "TRUCO_KV no está vinculado aún", fallback: true }), { status: 200, headers });
          }
          const data = await env.TRUCO_KV.get("league_state");
          if (!data) {
            return new Response(JSON.stringify({ error: "No hay datos en KV aún", fallback: true }), { status: 200, headers });
          }
          return new Response(data, { status: 200, headers });
        } catch (e) {
          return new Response(JSON.stringify({ error: e.message, fallback: true }), { status: 200, headers });
        }
      }

      if (request.method === "POST") {
        const headers = {
          "Content-Type": "application/json; charset=utf-8",
          ...corsHeaders
        };
        try {
          if (!env || !env.TRUCO_KV) {
            return new Response(JSON.stringify({ ok: false, error: "TRUCO_KV no está vinculado en Cloudflare" }), { status: 500, headers });
          }
          const body = await request.json();
          if (!body || !body.state || !body.auth) {
            return new Response(JSON.stringify({ ok: false, error: "Datos incompletos." }), { status: 400, headers });
          }
          const expectedHash = body.state.meta && body.state.meta.adminHash;
          if (!expectedHash || body.auth !== expectedHash) {
            return new Response(JSON.stringify({ ok: false, error: "Contraseña incorrecta o no autorizada." }), { status: 401, headers });
          }
          await env.TRUCO_KV.put("league_state", JSON.stringify(body.state));
          return new Response(JSON.stringify({ ok: true, savedAt: new Date().toISOString() }), { status: 200, headers });
        } catch (e) {
          return new Response(JSON.stringify({ ok: false, error: e.message }), { status: 500, headers });
        }
      }
    }

    // Servir archivos estáticos (index.html, etc.)
    if (env && env.ASSETS && typeof env.ASSETS.fetch === "function") {
      return env.ASSETS.fetch(request);
    }
    return fetch(request);
  }
};
