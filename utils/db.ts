import { DB } from "https://deno.land/x/sqlite@v3.8/mod.ts";

const confitPaht = Deno.env.get("CONFIGPATH")
export const db = new DB(`${confitPaht}/db.sqlite`);

export function initDB() {
  db.query(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL
  );
`);
db.query(`
  CREATE TABLE IF NOT EXISTS accounts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    name TEXT,
    balance REAL,
    FOREIGN KEY(user_id) REFERENCES users(id)
  );
`)
db.query(`
  CREATE TABLE IF NOT EXISTS transactions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    direction TEXT CHECK(direction IN ('income', 'outcome')) NOT NULL,
    type TEXT,
    time TEXT,
    create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    platform TEXT,
    amount REAL NOT NULL,
    balance REAL,
    account_id INTEGER NOT NULL,
    original_sms_content TEXT,
    note TEXT,
    FOREIGN KEY(account_id) REFERENCES accounts(id)
  );
`)
}