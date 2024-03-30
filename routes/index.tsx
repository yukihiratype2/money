import { FreshContext, Handlers } from "$fresh/server.ts";
import { setCookie } from "$std/http/cookie.ts";
import { Button } from "../components/Button.tsx";
import { Input } from "../components/Input.tsx";

export interface State {
  token: string;
}

export const handler: Handlers = {
  async GET(req, ctx: FreshContext) {
    return await ctx.render();
  },
  async POST(req, ctx: FreshContext) {
    const form = await req.formData();
    const token = form.get("token")?.toString();
    if (!token) {
      return new Response("Missing required fields", { status: 400 });
    }
    if (token != Deno.env.get("TOKEN")) {
      return new Response("Token error")
    }

    const headers = new Headers();
    headers.set("Location", "/app/user");
    setCookie(headers, {
      name: "token",
      value: token,
    });
    return new Response(null, {
      status: 303,
      headers,
    });
  },
};

export default function Home() {
  return (
    <div className="flex flex-col items-center mt-40">
      <h3>Login</h3>
      <form method="post" className={"flex flex-col space-y-2"}>
        <Input name="token"></Input>
        <Button type="submit">Login</Button>
      </form>
    </div>
  );
}
