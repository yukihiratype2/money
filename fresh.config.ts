import { defineConfig } from "$fresh/server.ts";
import tailwind from "$fresh/plugins/tailwind.ts";

import { initDB } from "./utils/db.ts";
initDB()

export default defineConfig({
  plugins: [tailwind()],
});
