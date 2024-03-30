import { FreshContext, Handlers } from "$fresh/server.ts";
import { extractMessage} from "../../../utils/gpt.ts";
import { RecordBase, Rec } from "../../../type/record.ts";
import { db } from "../../../utils/db.ts";
import { assert } from "$std/assert/assert.ts";

async function addRecord(message: string, account: number) {
  const recordBase: RecordBase = await extractMessage(message);
  const rec: Rec = {
    ...recordBase,
    account_id: account,
    original_sms_content: message
  }
  // insert transaction record
  db.query(`
    INSERT INTO transactions (account_id, direction, type, time, platform, amount, balance, original_sms_content)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `, [rec.account_id, rec.direction, rec.type, rec.time, rec.platform, rec.amount, rec.balance, rec.original_sms_content]);

  db.query(`
    UPDATE accounts SET balance =  ? WHERE id = ?`, [rec.balance, rec.account_id]);
}

export const handler: Handlers = {
  async POST(req: Request, ctx: FreshContext) {
    const data: {
      message: string
      account: number
    } = await req.json()

    assert(data.message, "message is required")
    assert(data.account, "account is required")

    addRecord(data.message, data.account);

    return new Response(JSON.stringify({"status": "ok"}));
  },
  async GET(req: Request, ctx: FreshContext) {
    const result = db.query(`
      SELECT * FROM transactions
    `)
    return new Response(JSON.stringify(result));
  }
}