import { db } from "./index";
import { v4 as uuidv4 } from "uuid";
import { FeatureTags } from "@/core/entities/feature-tag";
import { featureTags } from "./schema";
import { logger } from "@/lib/winston";
import type * as schema from "./schema";
import type { LibSQLDatabase } from "drizzle-orm/libsql";
 
const seedFeatureTags = async (db: LibSQLDatabase<typeof schema>) => {
  logger.info("Seeding feature tags...");

  const data: (typeof featureTags.$inferInsert)[] = [];
  
  for (const tag of FeatureTags) {
    data.push({
      id: uuidv4(),
      name: tag,
    });
  }
  
  try {
    await db.insert(featureTags).values(data).run();
    logger.info("Done seeding feature tags");
  } catch (err) {
    logger.error("Seed feature tags failed. Error: ", err)
  }
}

const main = async () => {
  await seedFeatureTags(db);
}

main().catch(e => console.log(e));