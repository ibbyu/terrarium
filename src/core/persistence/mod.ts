import { db } from "@/server/db";
import { mods } from "@/server/db/schema";
import { eq } from "drizzle-orm";

export async function getModBySlug(slug: string) {
  if (!slug) {
    throw new Error("slug parameter is undefined");
  }

  return await db.query.mods.findFirst({
    where: (mods, { eq }) => eq(mods.slug, slug)
  });
}

export async function createNewMod(mod: { id: string, name: string, slug: string, ownerId: string, summary: string }) {
  await db.insert(mods).values({...mod})
}