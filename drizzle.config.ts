import { type Config } from "drizzle-kit";

export default {
  schema: "./src/server/db/schema.ts",
  dialect: "sqlite",
  dbCredentials: {
    url: process.env.DATABASE_URL || "file:./sqlite.db",
  },
  tablesFilter: ["drive-clone_*"],
} as Config;
