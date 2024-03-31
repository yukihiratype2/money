import { FreshContext, Handlers } from "$fresh/server.ts";
import { extractMessage } from "../../../utils/gpt.ts";
import { RecordBase, Rec } from "../../../type/record.ts";
import { db } from "../../../utils/db.ts";
import { assert } from "$std/assert/assert.ts";

async function addRecord(message: string, account: number, location: string) {
  const recordBase: RecordBase = await extractMessage(message);
  const rec: Rec = {
    ...recordBase,
    account_id: account,
    original_sms_content: message,
  };
  // insert transaction record
  db.query(
    `
    INSERT INTO transactions (account_id, direction, type, time, platform, amount, balance, original_sms_content, location)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `,
    [
      rec.account_id,
      rec.direction,
      rec.type,
      rec.time,
      rec.platform,
      rec.amount,
      rec.balance,
      rec.original_sms_content,
      location
    ]
  );

  db.query(
    `
    UPDATE accounts SET balance =  ? WHERE id = ?`,
    [rec.balance, rec.account_id]
  );
}

function updateRecord(id: number, updatedRecord: Partial<Rec>) {
  let fieldsToUpdate = Object.keys(updatedRecord)
    .map((key) => `${key} = ?`)
    .join(", ");
  let valuesToUpdate = Object.values(updatedRecord);
  valuesToUpdate.push(id);

  db.query(
    `
    UPDATE transactions SET ${fieldsToUpdate} WHERE id = ?
  `,
    valuesToUpdate
  );
}

export const handler: Handlers = {
  async POST(req: Request, ctx: FreshContext) {
    const data: {
      message: string;
      location: string;
      account: number;
    } = await req.json();

    assert(data.message, "message is required");
    assert(data.account, "account is required");
    assert(data.location, "location is required");

    addRecord(data.message, data.account, data.location);

    return new Response(JSON.stringify({ status: "ok" }));
  },
  async PUT(req: Request, ctx: FreshContext) {
    const data: {
      id: number;
      updatedRecord: Partial<Rec>;
    } = await req.json();

    assert(data.id, "id is required");
    assert(data.updatedRecord, "updatedRecord is required");

    updateRecord(data.id, data.updatedRecord);

    return new Response(JSON.stringify({ status: "ok" }));
  },
  async GET(req: Request, ctx: FreshContext) {
    const result = db.query(`
      SELECT * FROM transactions
    `);
    return new Response(JSON.stringify(result));
  },
};
