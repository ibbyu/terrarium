import { NextResponse } from "next/server";
import type { z } from "zod";
import { v4 as uuidv4 } from 'uuid';
import { logger } from "@/lib/winston";
import { getServerAuthSession } from "@/server/auth";
import { updateModLinksSchema } from "@/core/validation/mod";
import { getModById } from "@/core/persistence/mod";
import { createModLinks, updateModLinks } from "@/core/persistence/mod-links";

export async function PATCH(request: Request, { params: { id } } : { params: { id: string } }) {
  try {
    const session = await getServerAuthSession();

    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const json = await request.json() as z.infer<typeof updateModLinksSchema>

    const { modLinksId, issues, source, wiki, discord  } = updateModLinksSchema.parse(json);

    const mod = await getModById(id);

    if (!mod) {
      return NextResponse.json({ message: "Mod not found" }, { status: 404 });
    }

    if (mod.ownerId !== session.user.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
    }

    if (modLinksId) {
      await updateModLinks(modLinksId, issues, source, wiki, discord);

      logger.info(`Mod links successfully updated. Mod name: '${mod.name}', User: '${session.user.name}'`);
    }
    else {
      await createModLinks(uuidv4(), mod.id, issues, source, wiki, discord);

      logger.info(`Mod links successfully created. Mod name: '${mod.name}', User: '${session.user.name}'`);

    }

    return NextResponse.json({ message: "Mod links updated" }, { status: 200 });
  }
  catch (error) {
    logger.info("Update mod links failed. An error occurred: ", error);

    return NextResponse.json({ message: "An unexpected error occurred" }, { status: 500 });
  }
}