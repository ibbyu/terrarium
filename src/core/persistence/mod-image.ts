import { db } from "@/server/db";
import { modImages } from "@/server/db/schema";

export async function createModImage(modImage: { id: string, modId: string, title: string, url: string}) {
  await db.insert(modImages).values({...modImage})
}