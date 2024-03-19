import { type Config } from "drizzle-kit";

import { env } from "@/env";

export default {
  schema: "./src/server/db/schema.ts",
  driver: "better-sqlite",
  dbCredentials: {
    url: env.NODE_ENV === "production" ? env.DATABASE_URL : env.LOCAL_DATABASE_URL,
  },
  tablesFilter: ["terrarium_*"],
} satisfies Config;
