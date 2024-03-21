import { NextResponse } from "next/server";

import { getServerAuthSession } from "@/server/auth";
import { logger } from "@/lib/winston";
import { deleteModById, getModById } from "@/core/persistence/mod";

export async function DELETE(request: Request, { params: { id } } : { params: { id: string } }) {
  try {
    const session = await getServerAuthSession();

    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const mod = await getModById(id);

    if (!mod) {
      logger.info(`Failed to delete mod. Mod does not exists. User: '${session.user.name}', Mod Id: '${id}'`);

      return NextResponse.json({ message: "Mod not found" }, { status: 404 });
    }

    if (mod.ownerId !== session.user.id) {
      logger.info(`Failed to delete mod. Unauthorized. User: '${session.user.name}', Mod name: '${mod.name}'`);

      return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
    }

    // TODO: Delete icon, if it exists

    await deleteModById(mod.id);

    logger.info(`Mod deleted successfully. User: '${session.user.name}', Mod name: '${mod.name}'`);

    return NextResponse.json({ message: "Mod deleted" }, { status: 200 });
  }
  catch (error) {
    logger.error("Failed to create mod, an exception occurred: ", error);

    return NextResponse.json({ message: "An unexpected error occurred" }, { status: 500 });
  }
}