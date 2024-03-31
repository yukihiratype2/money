import { RecordType } from "../const/record_type.ts";

export type RecordBase = {
  direction: "income" | "expense",
  type: RecordType,
  time: string,
  platform: "alipay" | "wechat" | "other",
  location: string,
  amount: number,
  balance: number
  note?: string
}

export type Rec = RecordBase & {
  id?: number,
  account_id: number,
  original_sms_content: string
}

export type FullRecord = Rec & {
  account_name: string
  user_name: string
}