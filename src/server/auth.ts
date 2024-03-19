/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import {
  getServerSession,
  type NextAuthOptions,
} from "next-auth";
import { type Adapter } from "next-auth/adapters";
import DiscordProvider from "next-auth/providers/discord";
import GitHubProvider from "next-auth/providers/github";

import { env } from "@/env";
import { db } from "@/server/db";
import { createTable } from "@/server/db/schema";

export const authOptions: NextAuthOptions = {
  callbacks: {
    session: ({ session, user }) => ({
      ...session,
      user: {
        ...session.user,
        id: user.id,
      },
    }),
  },
  adapter: DrizzleAdapter(db, createTable) as Adapter,
  providers: [
    DiscordProvider({
      clientId: env.DISCORD_CLIENT_ID,
      clientSecret: env.DISCORD_CLIENT_SECRET,
    }),
    GitHubProvider({
      clientId: env.GITHUB_ID,
      clientSecret: env.GITHUB_SECRET,
      // @ts-expect-error
      profile(profile) {
        return {
          id: profile.id.toString(),
          name: profile.login ?? profile.name,
          email: profile.email,
          image: profile.avatar_url,
        }
      }
    }),
  ],
  pages: {
    signIn: "/sign-in"
  }
};

export const getServerAuthSession = () => getServerSession(authOptions);