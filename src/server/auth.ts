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
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { env } from "@/env";
import { db } from "@/server/db";
import { createTable } from "@/server/db/schema";
import { signInSchema } from "@/core/validation/user";
import { getUserByUsername } from "@/core/persistence/user";
import { logger } from "@/lib/winston";

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/sign-in"
  },
  session: {
    strategy: "jwt"
  },
  callbacks: {
    session: ({ session, token }) => ({
      ...session,
      user: {
        ...session.user,
        id: token.id,
        joinedAt: token.joinedAt,
        name: token.name,
      },
    }),
    jwt: ({ token, user }) => {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.image = user.image;
        token.joinedAt = user.joinedAt;
      }

      return token;
    }
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
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "username", type: "text" },
        password: { label: "password", type: "password" }
      },
      async authorize(credentials) {
        const { username, password } = signInSchema.parse(credentials);

        const user = await getUserByUsername(username);

        if (!user) {
          logger.info(`Sign in failed, user does not exist. Username: '${username}'`);
          return null;
        }

        const match = await bcrypt.compare(password, user.password!);

        if (!match) {
          logger.info(`Sign in failed, incorrect password. Username: '${username}'`);

          return null;
        }

        logger.info(`Sign in success, Username: '${username}'`);

        return user;
      }
    })
  ],
};

export const getServerAuthSession = () => getServerSession(authOptions);