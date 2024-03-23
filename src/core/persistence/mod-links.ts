import { db } from "@/server/db";
import { modLinks } from "@/server/db/schema";
import { eq } from "drizzle-orm/sql";

export async function createModLinks(id: string, modId: string, issues?: string, source?: string, wiki?: string, discord?: string) {
  await db.insert(modLinks).values({
    id,
    issues,
    source,
    wiki,
    discord,
    modId
  });
}

export async function updateModLinks(modLinksId: string, issues?: string, source?: string, wiki?: string, discord?: string) {
  void await db.update(modLinks).set({ issues, source, wiki, discord }).where(eq(modLinks.id, modLinksId));
}