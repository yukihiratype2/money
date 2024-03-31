import { FreshContext, Handlers } from "$fresh/server.ts";

export const handler: Handlers = {
  async GET(req, ctx: FreshContext) {
    const headers = new Headers();
    headers.set("location", "/app/record");
    return new Response(null, {
      status: 303, // See Other
      headers,
    });
  },
};

export default function App() {
  return <div></div>;
}
