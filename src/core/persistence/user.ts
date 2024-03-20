import { db } from "@/server/db";

export async function getUserByUsernameWithMods(username: string) {
  return await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.name, username),
    with: {
      mods: true
    }
  });
}