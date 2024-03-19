import { NextResponse } from "next/server";
import { getServerAuthSession } from "@/server/auth";

import { createNewModSchema } from "@/core/validation/mod";
import { createNewModService } from "@/core/services/mod";
import { logger } from "@/lib/winston";

export async function POST(request: Request) {
    const session = await getServerAuthSession();
    
    if (!session) {
      logger.info("Failed to create mod. User not authenticated");

      return NextResponse.json({ error: "Unauthenticated" }, { status: 401 });
    }

  const json = await request.json() as { name: string, summary: string };
  const { name, summary } = createNewModSchema.parse(json);

  const result = await createNewModService({ name, summary, username: session.user.name, userId: session.user.id });

  if (result.alreadyExists) {
    return NextResponse.json({ error: result.slug }, { status: 400 });
  }

  if (result.error) {
    return NextResponse.json({ error: result.slug }, { status: 500 });
  }

  return NextResponse.json({ slug: result.slug }, { status: 200 });
}