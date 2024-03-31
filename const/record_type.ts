export enum RecordType {
  INVEST = "invest",
  REPAY_LOAN = "repay_loan",
  TRANSFER = "transfer",
  TRANSPORT = "transport",
  CAR = "car",
  HEALTH = "health",
  EAT = "eat",
  PET = "pet",
  SUBSCRIPTION = "subscription",
  ENTERTAINMENT = "entertainment",
  OTHER = "other",
}

export const recordTypeEmoji: { [key in RecordType]: string } = {
  [RecordType.INVEST]: "💰",
  [RecordType.REPAY_LOAN]: "💸",
  [RecordType.TRANSFER]: "💱",
  [RecordType.TRANSPORT]: "🚗",
  [RecordType.CAR]: "🚘",
  [RecordType.HEALTH]: "🏥",
  [RecordType.EAT]: "🍔",
  [RecordType.PET]: "🐶",
  [RecordType.SUBSCRIPTION]: "📬",
  [RecordType.ENTERTAINMENT]: "🎬",
  [RecordType.OTHER]: "❓",
}