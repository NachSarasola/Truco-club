// Cloudflare Pages Function: /api/state
// Lee y guarda el estado de la liga en Cloudflare KV (TRUCO_KV)

export async function onRequestGet(context) {
  const headers = {
    "Content-Type": "application/json; charset=utf-8",
    "Access-Control-Allow-Origin": "*",
    "Cache-Control": "public, max-age=10, stale-while-revalidate=30"
  };

  try {
    if (!context.env || !context.env.TRUCO_KV) {
      return new Response(JSON.stringify({ error: "TRUCO_KV no está vinculado", fallback: true }), {
        status: 200,
        headers
      });
    }

    const data = await context.env.TRUCO_KV.get("league_state");
    if (!data) {
      return new Response(JSON.stringify({ error: "No hay datos en KV aún", fallback: true }), {
        status: 200,
        headers
      });
    }

    return new Response(data, { status: 200, headers });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message, fallback: true }), {
      status: 200,
      headers
    });
  }
}

export async function onRequestPost(context) {
  const headers = {
    "Content-Type": "application/json; charset=utf-8",
    "Access-Control-Allow-Origin": "*"
  };

  try {
    if (!context.env || !context.env.TRUCO_KV) {
      return new Response(JSON.stringify({
        ok: false,
        error: "TRUCO_KV no está vinculado en Cloudflare Pages. Por favor vinculalo en la configuración de Pages."
      }), { status: 500, headers });
    }

    const body = await context.request.json();
    if (!body || !body.state || !body.auth) {
      return new Response(JSON.stringify({ ok: false, error: "Datos incompletos para guardar." }), {
        status: 400,
        headers
      });
    }

    // Validación de seguridad: verificar hash de administrador
    const expectedHash = body.state.meta && body.state.meta.adminHash;
    if (!expectedHash || body.auth !== expectedHash) {
      return new Response(JSON.stringify({ ok: false, error: "Contraseña incorrecta o no autorizada." }), {
        status: 401,
        headers
      });
    }

    // Guardar en Cloudflare KV
    const toSave = JSON.stringify(body.state);
    await context.env.TRUCO_KV.put("league_state", toSave);

    return new Response(JSON.stringify({
      ok: true,
      savedAt: new Date().toISOString(),
      message: "Publicado en vivo exitosamente."
    }), { status: 200, headers });
  } catch (err) {
    return new Response(JSON.stringify({ ok: false, error: err.message }), {
      status: 500,
      headers
    });
  }
}

export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type"
    }
  });
}
