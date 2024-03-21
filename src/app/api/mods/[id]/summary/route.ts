import { NextResponse } from "next/server";

import { getServerAuthSession } from "@/server/auth";
import { logger } from "@/lib/winston";
import { updateModSummarySchema } from "@/core/validation/mod";
import { getModById, updateModSummaryById } from "@/core/persistence/mod";

export async function PATCH(request: Request, { params: { id } } : { params: { id: string } }) {
  try {
    const session = await getServerAuthSession();

    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const json = await request.json() as { summary: string };
    const { summary } = updateModSummarySchema.parse(json);

    const mod = await getModById(id);

    if (!mod) {
      logger.info(`Failed to update mod summary. Mod does not exists. User: '${session.user.name}'`);

      return NextResponse.json({ message: "Mod not found" }, { status: 404 });
    }

    if (mod.ownerId !== session.user.id) {
      logger.info(`Failed to update mod summary. Unauthorized. User: '${session.user.name}', Mod name: '${mod.name}'`);

      return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
    }

    await updateModSummaryById(mod.id, summary);

    logger.info(`Mod summary updated. User: '${session.user.name}', Mod name: ${mod.name}`);

    return NextResponse.json({ message: "Summary updated" }, { status: 200 });
  }
  catch (error) {
    logger.error("Failed to update mod summary. An exception occurred: ", error);

    return NextResponse.json({ message: "An unexpected error occurred" }, { status: 500 });
  }
}