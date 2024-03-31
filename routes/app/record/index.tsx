import { Handlers, PageProps } from "$fresh/server.ts";
import { Row } from "https://deno.land/x/sqlite@v3.8/mod.ts";
import { List, ListItem } from "../../../components/List.tsx";
import { db } from "../../../utils/db.ts";
import { FullRecord } from "../../../type/record.ts";
import RecordItem from "../../../islands/RecordItem.tsx";

export const handler: Handlers<FullRecord[]> = {
  async GET(req, ctx) {
    // query all records, join user and account
    const result = db.query(`
      SELECT
        transactions.id, transactions.direction, transactions.type, transactions.time, transactions.platform, transactions.amount, transactions.balance, transactions.account_id, transactions.original_sms_content, transactions.note,
        accounts.name as account_name, users.name as user_name
      FROM transactions
      LEFT JOIN accounts ON accounts.id = transactions.account_id
      LEFT JOIN users ON users.id = accounts.user_id
    `);
    const records: FullRecord[] = result.map((row: Row) => {
      return {
        id: row[0] as number,
        direction: row[1] as "income" | "outcome",
        type: row[2] as string,
        time: row[3] as string,
        platform: row[4] as "alipay" | "wechat" | "other",
        amount: row[5] as number,
        balance: row[6] as number,
        account_id: row[7] as number,
        original_sms_content: row[8] as string,
        note: row[9] as string,
        account_name: row[10] as string,
        user_name: row[11] as string,
      };
    });
    return await ctx.render(records);
  },
};

export default function RecordList(props: PageProps<FullRecord[]>) {
  return (
    <>
      <div className={"flex flex-col items-stretch"}>
        <List className={"m-4"}>
          {props.data.map((record) => (
            <RecordItem record={record} key={record.id}></RecordItem>
          ))}
        </List>
      </div>
    </>
  );
}
