import { Handlers, PageProps } from "$fresh/server.ts";
import { Row } from "https://deno.land/x/sqlite@v3.8/mod.ts";
import { List, ListItem } from "../../../components/List.tsx";
import { UserWithBalance } from "../../../type/user.ts";
import { db } from "../../../utils/db.ts";

export const handler: Handlers<UserWithBalance[]> = {
  async GET(req, ctx) {
    // query all users with balance, balance is the sum of all accounts
    const result = db.query(`
      SELECT
        users.id,
        users.name,
        SUM(accounts.balance) as balance
      FROM users
      LEFT JOIN accounts ON accounts.user_id = users.id
      GROUP BY users.id
    `);
    const users: UserWithBalance[] = result.map((row: Row) => {
      return {
        id: row[0] as number,
        name: row[1] as string,
        balance: row[2] as number,
      };
    });
    return await ctx.render(users);
  },
};

export default function UserList(props: PageProps<UserWithBalance[]>) {
  return (
    <>
      <div className={"flex flex-col items-stretch"}>
        <header className={"p-4 border-b mb-4"}>User</header>
        <List className={"m-4"}>
          {props.data.map((user) => (
            <ListItem key={user.id} className={"flex"}>
              <span className={"text-xl flex-1 items-center"}>{user.name}</span>
              <span>
                <span className={"text-current/50 mr-2"}>Balance:</span>
                <span>{user.balance}</span>
              </span>
            </ListItem>
          ))}
        </List>
      </div>
    </>
  );
}
