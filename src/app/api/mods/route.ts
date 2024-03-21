import { NextResponse } from "next/server";
import { v4 as uuidv4 } from 'uuid';
import { getServerAuthSession } from "@/server/auth";

import { createNewModSchema } from "@/core/validation/mod";
import { logger } from "@/lib/winston";
import { createNewMod, getModBySlug } from "@/core/persistence/mod";
import { toSlugCase } from "@/core/common/utils";

export async function POST(request: Request) {
  try {
    const session = await getServerAuthSession();

    if (!session) {
      logger.info(`Failed to create mod. Mod already exists. User not authenticated`);

      return NextResponse.json({ message: "Unauthenticated" }, { status: 401 });
    }

    const json = await request.json() as { name: string, summary: string };
    const { name, summary } = createNewModSchema.parse(json);

    const slug = toSlugCase(name);

    const exists = await getModBySlug(slug);
  
    if (exists) {
      logger.info(`Failed to create mod. Mod already exists. Mod name: '${name}', User: '${session.user.name}'`);

      return NextResponse.json({ message: "This mod already exists" }, { status: 400 });
    }
    
    const mod = { id: uuidv4(), name, slug, ownerId: session.user.id, summary };
    await createNewMod(mod);
    
    logger.info(`Mod successfully created. Mod name: '${name}', User: '${session.user.name}'`);

    return NextResponse.json({ slug, message: "Mod created" }, { status: 200 });
  }
  catch(error) {
    logger.error("Failed to create mod, an error occurred: ", error);

    return NextResponse.json({ message: "An unexpected error occurred" }, { status: 500 });
  }
}