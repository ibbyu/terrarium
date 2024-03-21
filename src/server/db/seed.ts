import { db } from "./index";
import { v4 as uuidv4 } from "uuid";
import { FeatureTags } from "@/core/entities/feature-tag";
import { featureTags } from "./schema";
import { logger } from "@/lib/winston";
import type { BetterSQLite3Database } from 'drizzle-orm/better-sqlite3'
import type * as schema from "./schema";
 
const seedUsers = (db: BetterSQLite3Database<typeof schema>) => {
  const data: (typeof featureTags.$inferInsert)[] = [];
  
  for (const tag of FeatureTags) {
    data.push({
      id: uuidv4(),
      name: tag,
    });
  }
  
  try {
    db.insert(featureTags).values(data).run()
  } catch (err) {
    
  }
}

const main = () => {
  logger.info("Seeding database...");
  seedUsers(db)
  logger.info("Done seeding database");
}

main();