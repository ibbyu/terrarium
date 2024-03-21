"use server"
import { db } from "@/server/db";

export async function getFeatureTags() {
  return await db.query.featureTags.findMany();
}

export async function getFeatureTagByName(tagName: string) {
  return await db.query.featureTags.findFirst({
    where: (featureTags, { eq }) => eq(featureTags.name, tagName)
  });
}