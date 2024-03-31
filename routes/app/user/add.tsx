import { Handlers } from "$fresh/server.ts";
import { Button } from "../../../components/Button.tsx";
import { FormItem } from "../../../components/FormItem.tsx";
import { Input } from "../../../components/Input.tsx";
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
      <form method="post" className={"m-4 flex flex-col space-y-2"}>
        {/* <input type="text" name="name" value="" />
        <button type="submit">Add User</button> */}
        <FormItem label="User Name">
          <Input type="text" name="name" value="" />
        </FormItem>
        <div>
          <Button type="submit">Add User</Button>
        </div>
      </form>
    </>
  );
}