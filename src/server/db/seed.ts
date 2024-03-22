import { db } from "./index";
import { v4 as uuidv4 } from "uuid";
import { FeatureTags } from "@/core/entities/feature-tag";
import { featureTags } from "./schema";
import { logger } from "@/lib/winston";
import type { BetterSQLite3Database } from 'drizzle-orm/better-sqlite3'
import type * as schema from "./schema";
 
const seedFeatureTags = (db: BetterSQLite3Database<typeof schema>) => {
  logger.info("Seeding feature tags...");

  const data: (typeof featureTags.$inferInsert)[] = [];
  
  for (const tag of FeatureTags) {
    data.push({
      id: uuidv4(),
      name: tag,
    });
  }
  
  try {
    db.insert(featureTags).values(data).run();
    logger.info("Done seeding feature tags");
  } catch (err) {
    logger.error("Seed feature tags failed. Error: ", err)
  }
}

const main = () => {
  seedFeatureTags(db);
}

main();