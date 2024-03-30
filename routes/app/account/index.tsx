import { Handlers, PageProps } from "$fresh/server.ts";
import { Row } from "https://deno.land/x/sqlite@v3.8/mod.ts";
import { List, ListItem } from "../../../components/List.tsx";
import { User } from "../../../type/user.ts";
import { db } from "../../../utils/db.ts";
import { Account, AccountWithUser } from "../../../type/account.ts";

export const handler: Handlers<AccountWithUser[]> = {
  async GET(req, ctx) {
    const res = db.query(`
      SELECT accounts.id, accounts.user_id, accounts.name, accounts.balance, users.name as user_name
      FROM accounts
      JOIN users ON accounts.user_id = users.id
    `);
    const accounts: AccountWithUser[] = res.map((row: Row) => {
      return {
        id: row[0] as number,
        user_id: row[1] as number,
        name: row[2] as string,
        balance: row[3] as number,
        user_name: row[4] as string,
      };
    });
    return await ctx.render(accounts);
  },
};

export default function AccountList(props: PageProps<AccountWithUser[]>) {
  return (
    <>
      <div className={"flex flex-col items-stretch"}>
        <header className={"p-4 border-b mb-4"}>Account</header>
        <List className={"m-4"}>
          {props.data.map((account) => (
            <ListItem key={account.id} className={"flex items-center"}>
              <span className={"text-sm mr-1"}>{account.id}</span>
              <div className={"flex flex-col flex-1"}>
                <span className={"text-xl"}>{account.name}</span>
                <span className={"text-xs"}>{account.user_name}</span>
              </div>
              <span>
                <span className={"text-current/50 mr-2"}>Balance:</span>
                <span>{account.balance}</span>
              </span>
            </ListItem>
          ))}
        </List>
      </div>
    </>
  );
}
