import { Handlers } from "$fresh/server.ts";
import { db } from "../../../utils/db.ts";

export const handler: Handlers = {
  async GET(req, ctx) {
    return await ctx.render();
  },
  async POST(req, ctx) {
    const form = await req.formData();
    const name = form.get("name")?.toString();
    if (!name) {
      return new Response("Missing required fields", { status: 400 });
    }
    db.query("INSERT INTO users (name) VALUES (?)", [name]);

    const headers = new Headers();
    headers.set("location", "/app/user");
    return new Response(null, {
      status: 303, // See Other
      headers,
    });
  },
};

export default function AddUser() {
  return (
    <>
      <form method="post">
        <input type="text" name="name" value="" />
        <button type="submit">Add User</button>
      </form>
    </>
  );
}