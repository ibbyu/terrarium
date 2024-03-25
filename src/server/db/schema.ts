import { relations, sql } from "drizzle-orm";
import {
  index,
  int,
  primaryKey,
  sqliteTableCreator,
  text,
} from "drizzle-orm/sqlite-core";
import { type AdapterAccount } from "next-auth/adapters";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = sqliteTableCreator((name) => `terrarium_${name}`);

export const accounts = createTable(
  "account",
  {
    userId: text("userId", { length: 255 })
      .notNull()
      .references(() => users.id),
    type: text("type", { length: 255 })
      .$type<AdapterAccount["type"]>()
      .notNull(),
    provider: text("provider", { length: 255 }).notNull(),
    providerAccountId: text("providerAccountId", { length: 255 }).notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: int("expires_at"),
    token_type: text("token_type", { length: 255 }),
    scope: text("scope", { length: 255 }),
    id_token: text("id_token"),
    session_state: text("session_state", { length: 255 }),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
    userIdIdx: index("account_userId_idx").on(account.userId),
  })
);

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, { fields: [accounts.userId], references: [users.id] }),
}));

export const sessions = createTable(
  "session",
  {
    sessionToken: text("sessionToken", { length: 255 }).notNull().primaryKey(),
    userId: text("userId", { length: 255 })
      .notNull()
      .references(() => users.id),
    expires: int("expires", { mode: "timestamp" }).notNull(),
  },
  (session) => ({
    userIdIdx: index("session_userId_idx").on(session.userId),
  })
);

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, { fields: [sessions.userId], references: [users.id] }),
}));

export const verificationTokens = createTable(
  "verificationToken",
  {
    identifier: text("identifier", { length: 255 }).notNull(),
    token: text("token", { length: 255 }).notNull(),
    expires: int("expires", { mode: "timestamp" }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
  })
);

export const users = createTable("user", {
  id: text("id", { length: 255 }).notNull().primaryKey(),
  name: text("name", { length: 255 }).notNull(),
  email: text("email", { length: 255 }).unique().notNull(),
  emailVerified: int("emailVerified", {
    mode: "timestamp",
  }).default(sql`CURRENT_TIMESTAMP`),
  image: text("image", { length: 255 }),
  joinedAt: text('joinedAt').default(sql`(strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))`).notNull(),
  password: text("password"),
});

export const usersRelations = relations(users, ({ many }) => ({
  accounts: many(accounts),
  mods: many(mods) // ownedMods
}));

export const mods = createTable("mod", {
  id: text("id", { length: 255 }).notNull().primaryKey(),
  slug: text("slug", { length: 255 }).notNull().unique(),
  name: text("name", { length: 255 }).notNull(),
  summary: text("summary", { length: 255 }).notNull(),
  icon: text("icon", { length: 255 }),
  description: text("description"),
  draft: int("draft").default(1).notNull(),
  approved: int("approved").default(0).notNull(),
  createdAt: text('createdAt').default(sql`(strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))`).notNull(),
  updatedAt: text('updatedAt').default(sql`(strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))`).notNull(),
  downloads: int("downloads").default(0).notNull(),
  ownerId: text("ownerId", { length: 255 }).references(() => users.id, { onDelete: "cascade"}),
  environment: text("environment", { length: 255 }), 
});

export const modRelations = relations(mods, ({ one, many }) => ({
  owner: one(users, {
    fields: [mods.ownerId],
    references: [users.id]
  }),
  featureTags: many(featureTagOnMods),
  links: one(modLinks),
  teamMembers: many(memberships),
  images: many(modImages)
}));

export const featureTags = createTable("featureTag", {
  id: text("id", { length: 255 }).notNull().primaryKey(),
  name: text("name", { length: 255}).notNull().unique(),
});

export const featureTagRelations = relations(featureTags, ({ many }) => ({
  featureTagOnMods: many(featureTagOnMods)
}));

export const featureTagOnMods = createTable("featureTagOnMod", {
  featureTagId: text("tagId", { length: 255 }).notNull().references(() => featureTags.id, { onDelete: "cascade"}).unique(),
  modId: text("modId", { length: 255 }).notNull().references(() => mods.id, { onDelete: "cascade"}),
}, (table) => {
  return {
    pk: primaryKey({ columns: [table.featureTagId, table.modId] }),
  };
});

export const featureTagOnModsRelations = relations(featureTagOnMods, ({ one }) => ({
  mod: one(mods, {
    fields: [featureTagOnMods.modId],
    references: [mods.id]
  }),
  featureTag: one(featureTags, {
    fields: [featureTagOnMods.featureTagId],
    references: [featureTags.id]
  })
}));

export const modLinks = createTable("modLinks", {
  id: text("id", { length: 255 }).notNull().primaryKey(),
  issues: text("issues", { length: 255 }),
  discord: text("discord", { length: 255 }),
  wiki: text("wiki", { length: 255 }),
  source: text("source", { length: 255}),
  modId: text("modId", { length: 255}).notNull().unique().references(() => mods.id, { onDelete: "cascade"})
});

export const modLinksRelations = relations(modLinks, ({ one }) => ({
  mod: one(mods, {
    fields: [modLinks.modId],
    references: [mods.id]
  })
}));

export const teams = createTable("teams", {
  id: text("id", { length: 255 }).notNull().primaryKey(),
  createdAt: text('createdAt').default(sql`(strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))`).notNull(),
});

export const teamRelations = relations(teams, ({ many }) => ({
  mods: many(mods),
  members: many(memberships),
}));

export const memberships = createTable("membership", {
  id: text("id", { length: 255 }).notNull().primaryKey(),
  createdAt: text('createdAt').default(sql`(strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))`).notNull(),
  userId: text("userId", { length: 255}).notNull().unique().references(() => users.id, { onDelete: "cascade"}),
  modId: text("modId", { length: 255}).notNull().references(() => mods.id, { onDelete: "cascade"}),
  teamId: text("teamId", { length: 255}).notNull().references(() => mods.id, { onDelete: "cascade"}),
});

export const membershipRelations = relations(memberships, ({ one }) => ({
  user: one(users, {
    fields: [memberships.userId],
    references: [users.id]
  }),
  mod: one(mods, {
    fields: [memberships.modId],
    references: [mods.id]
  }),
  team: one(teams, {
    fields: [memberships.teamId],
    references: [teams.id]
  }), 
}));

export const modImages = createTable("modImage", {
  id: text("id", { length: 255 }).notNull().primaryKey(),
  title: text("title", { length: 255 }),
  createdAt: text('createdAt').default(sql`(strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))`).notNull(),
  updatedAt: text('updatedAt').default(sql`(strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))`).notNull(),
  modId: text("modId", { length: 255}).notNull().references(() => mods.id, { onDelete: "cascade"}),
  index: int("index")
});

export const modImageRelations = relations(modImages, ({ one }) => ({
  mod: one(mods, {
    fields: [modImages.modId],
    references: [mods.id]
  }),
}));