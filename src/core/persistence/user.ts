import { db } from "@/server/db";
import { users } from "@/server/db/schema";

export async function getUserByUsernameWithMods(username: string) {
  return await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.name, username),
    with: {
      mods: true
    }
  });
}

export async function getUserByUsername(username: string) {
  return await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.name, username)
  });
}

export async function createUser(userId: string, username: string, email: string, hashedPassword: string) {
  await db.insert(users).values({
    id: userId,
    name: username,
    email: email,
    password: hashedPassword,
    emailVerified: null,
  });
}

export async function getUserByEmail(email: string) {
  return await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.email, email)
  });
}