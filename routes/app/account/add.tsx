import { Handlers, PageProps } from "$fresh/server.ts";
import { Button } from "../../../components/Button.tsx";
import { FormItem } from "../../../components/FormItem.tsx";
import { Input } from "../../../components/Input.tsx";
import { db } from "../../../utils/db.ts";
import { User } from "../../../type/user.ts";
import { Row } from "https://deno.land/x/sqlite@v3.8/mod.ts";
import { Select } from "../../../components/Select.tsx";

export const handler: Handlers = {
  async GET(req, ctx) {
    const result = db.query(`SELECT * FROM users`);
    const users: User[] = result.map((row: Row) => {
      return {
        id: row[0] as number,
        name: row[1] as string,
      };
    });
    return await ctx.render(users);
  },
  async POST(req, ctx) {
    const form = await req.formData();
    const accountName = form.get("name")?.toString();
    const balance = form.get("balance")?.toString();
    const note = form.get("note")?.toString();
    const userId = form.get("user_id")?.toString();
    if (!accountName || !balance || !userId) {
      return new Response("Missing required fields", { status: 400 });
    }

    db.query("INSERT INTO accounts (name, balance, note, user_id) VALUES (?, ?, ?, ?)", [
      accountName,
      balance,
      note,
      userId,
    ]);

    const headers = new Headers();
    headers.set("location", "/app/account");
    return new Response(null, {
      status: 303, // See Other
      headers,
    });
  },
};

export default function AddAccount(props: PageProps<User[]>) {
  return (
    <>
      <div className={"flex flex-col items-stretch"}>
        <form method="post" className={"m-4 flex flex-col space-y-2"}>
          <FormItem label="Account Name">
            <Input type="text" name="name" value="" />
          </FormItem>
          <FormItem label="Note">
            <Input type="text" name="note" value="" />
          </FormItem>
          <FormItem label="Balance">
            <Input type="number" name="balance" value="0" />
          </FormItem>
          <FormItem label="User">
            <Select name="user_id" >
              {props.data.map((user) => (
                <option key={user.id} value={user.id}>{user.name}</option>
              ))}
            </Select>
          </FormItem>
          <div>
            <Button type="submit">Add Account</Button>
          </div>
        </form>
      </div>
    </>
  );
}
