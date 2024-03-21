import { NextResponse } from "next/server";
import { v4 as uuidv4 } from 'uuid';
import type { z } from "zod";
import bcrypt from "bcrypt";
import { logger } from "@/lib/winston";

import { signUpSchema } from '@/core/validation/user';
import { getUserByUsername, getUserByEmail, createUser } from "@/core/persistence/user";

export async function POST(request: Request) {
  try {
    const json = await request.json() as z.infer<typeof signUpSchema>;
    const { username, email, password } = signUpSchema.parse(json);

    const userUsername = await getUserByUsername(username);

    const userEmail = await getUserByEmail(email);

    if (userUsername) {
      logger.info(`Signup failed. Username has been taken. Username: '${username}'`);

      return NextResponse.json({ message: "Username taken" }, { status: 400 });
    }

    if (userEmail) {
      logger.info(`Signup failed. Email already has been used. Username: '${username}', Email: '${email}'`);

      return NextResponse.json({ message: "An account has already been created with this email address" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    
    await createUser(uuidv4(), username, email, hashedPassword);

    logger.info(`Signup successful. Username: '${username}'`);

    return NextResponse.json({ message: "Account Created" }, { status: 200 });
  }
  catch (error) {
    logger.error("Sign up failed. An error occurred: ", error);

    return NextResponse.json({ message: "An unexpected error occurred" }, { status: 500 });
  }
}