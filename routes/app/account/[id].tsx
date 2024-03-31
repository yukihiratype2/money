import { Handlers, PageProps } from "$fresh/server.ts";
import { Button } from "../../../components/Button.tsx";
import { FormItem } from "../../../components/FormItem.tsx";
import { Input } from "../../../components/Input.tsx";
import { AccountWithUser } from "../../../type/account.ts";
import { db } from "../../../utils/db.ts";

function updateAccount(id: number, updatedAccount: Partial<AccountWithUser>) {
  let fieldsToUpdate = Object.keys(updatedAccount)
    .map((key) => `${key} = ?`)
    .join(", ");
  let valuesToUpdate = Object.values(updatedAccount);
  valuesToUpdate.push(id);

  db.query(
    `
    UPDATE accounts SET ${fieldsToUpdate} WHERE id = ?
  `,
    valuesToUpdate
  );
}

export const handler: Handlers<AccountWithUser> = {
  async GET(req, ctx) {
    const id = ctx.params.id;
    const res = db.query(
      `
      SELECT accounts.id, accounts.user_id, accounts.name, accounts.balance, accounts.note, users.name as user_name
      FROM accounts
      JOIN users ON accounts.user_id = users.id
      WHERE accounts.id = ?
    `,
      [id]
    );
    if (res.length === 0) {
      return new Response("Not Found", { status: 404 });
    }
    const row = res[0];
    const account = {
      id: row[0] as number,
      user_id: row[1] as number,
      name: row[2] as string,
      balance: row[3] as number,
      note: row[4] as string,
      user_name: row[5] as string,
    };
    return await ctx.render(account);
  },
  async POST(req, ctx) {
    const id = ctx.params.id;
    const form = await req.formData();
    const accountName = form.get("name")?.toString();
    const balance = form.get("balance")?.toString();
    const note = form.get("note")?.toString();
    if (!accountName || !balance) {
      return new Response("Missing required fields", { status: 400 });
    }

    updateAccount(parseInt(id, 10), {
      name: accountName,
      balance: Number(balance),
      note,
    });

    const headers = new Headers();
    headers.set("location", `/app/account/${id}`);
    return new Response(null, {
      status: 303, // See Other
      headers,
    });
  },
};

export default function Greet(props: PageProps<AccountWithUser>) {
  return (
    <div className={"flex flex-col items-stretch"}>
      <div className={"m-4"}>
        <form method="post" className={"flex flex-col space-y-2"}>
          <FormItem label="Account Name">
            <Input type="text" name="name" value={props.data.name} />
          </FormItem>
          <FormItem label="Note">
            <Input type="text" name="note" value={props.data.note} />
          </FormItem>
          <FormItem label="Balance">
            <Input type="number" name="balance" value={props.data.balance} />
          </FormItem>
          <div>
            <Button type="submit">Update Account</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
