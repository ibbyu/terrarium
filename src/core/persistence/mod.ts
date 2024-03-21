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

export async function getModById(id: string) {
  if (!id) {
    throw new Error("id parameter is undefined");
  }

  return await db.query.mods.findFirst({
    where: (mods, { eq }) => eq(mods.id, id)
  });
}

export async function deleteModById(id: string) {
  if (!id) {
    throw new Error("id parameter is undefined");
  }

  await db.delete(mods).where(eq(mods.id, id));
}

export async function getModBySlugWithOwner(slug: string) {
  if (!slug) {
    throw new Error("slug parameter is undefined");
  }

  return await db.query.mods.findFirst({
    where: (mods, { eq }) => eq(mods.slug, slug),
    with: {
      owner: true
    }
  });
}

export async function createNewMod(mod: { id: string, name: string, slug: string, ownerId: string, summary: string }) {
  await db.insert(mods).values({...mod})
}

export async function getModsByQueryWithOwner(query?: string, limit = 10) {
  return await db.query.mods.findMany({
    limit,
    where: query ? (mods, { like }) => like(mods.name, `%${query}%`) : undefined,
    with: {
      owner: true,
    }
  });
}

export async function updateModSummaryById(id: string, summary: string) {
  if (!id) {
    throw new Error("id parameter is undefined");
  }

  if (!summary) {
    throw new Error("summary parameter is undefined");
  }

  await db.update(mods).set({ summary }).where(eq(mods.id, id));
}

export async function updateModDescriptionById(id: string, description: string) {
  if (!id) {
    throw new Error("id parameter is undefined");
  }

  await db.update(mods).set({ description }).where(eq(mods.id, id));
}

export async function getModBySlugWithTags(slug: string) {
  if (!slug) {
    throw new Error("slug parameter is undefined");
  }

  return await db.query.mods.findFirst({
    where: (mods, { eq }) => eq(mods.slug, slug),
    with: {
      featureTags: true
    }
  });
}