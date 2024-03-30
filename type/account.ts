export type Account = {
  id?: number,
  user_id: number,
  name: string,
  balance: number
}

export type AccountWithUser = Account & {
  user_name: string
}