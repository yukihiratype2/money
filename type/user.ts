export type User = {
  id?: number,
  name: string,
  balance?: number,
}

export type UserWithBalance = User & {
  balance: number,
}