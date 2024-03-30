import { FreshContext } from "$fresh/server.ts";
import { getCookies } from "$std/http/cookie.ts";

interface State {
  logined: true;
}

export async function handler(
  req: Request,
  ctx: FreshContext<State>,
) {
  const cookies = getCookies(req.headers);
  const token = req.headers.get("token");
  if (cookies["token"] === Deno.env.get("TOKEN") || token === Deno.env.get("TOKEN")) {

    ctx.state.logined = true;

    const resp = await ctx.next();
    return resp;
  } else {
    return new Response(null, {
      status: 303,
      headers: {
        "Location": "/",
      },
    });
  }
}
