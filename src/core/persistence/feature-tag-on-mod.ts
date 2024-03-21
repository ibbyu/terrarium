import { db } from "@/server/db";
import { featureTagOnMods } from "@/server/db/schema";
import { eq } from "drizzle-orm";

export async function createFeatureTagOnMod(modId: string, featureTagId: string) {
  await db.insert(featureTagOnMods).values({
    modId,
    featureTagId
  });
}

export async function deleteFeatureTagOnMod(id: string) {
  await db.delete(featureTagOnMods).where(eq(featureTagOnMods.featureTagId, id));
}