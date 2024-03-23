import { NextResponse } from "next/server";

import { logger } from "@/lib/winston";
import { getServerAuthSession } from "@/server/auth";
import { updateIconSchema } from "@/core/validation/mod";
import { deleteFileByUrl } from "@/server/uploadthing";
import { getModById, updateModIconById } from "@/core/persistence/mod";

export async function PATCH(request: Request, { params: { id } } : { params: { id: string } }) {
  try {
    const session = await getServerAuthSession();

    if (!session) {
      logger.info("Update mod icon failed. User is not authenticated.");

      return new NextResponse("Unauthorized", { status: 401 });
    }

    const json = await request.json() as { imageUrl: string };
    const { icon } = updateIconSchema.parse(json);
    
    const mod = await getModById(id);

    if (!mod) {
      logger.info(`Update mod icon failed. Mod not found. Mod id '${id}', User: '${session.user.name}'`);

      return NextResponse.json({ message: "Mod not found" }, { status: 404 });
    }

    if (mod.ownerId !== session.user.id) {
      logger.info(`Update mod icon failed. User does not own this mod. Mod name: '${mod.name}' User: '${session.user.name}'`);

      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    if (mod.icon) {
      await deleteFileByUrl(mod.icon);

      logger.info(`Old mod icon deleted. Mod name: '${mod.name}' User: '${session.user.name}'`);
    }

    await updateModIconById(id, icon);

    logger.info(`Mod icon successfully updated. Mod name: '${mod.name}' User: '${session.user.name}'`);

    return NextResponse.json({ message: "Mod icon updated" }, { status: 200 });
  }
  catch (error) {
    logger.error("pdate mod icon failed. An exception occurred: ", error);

    return NextResponse.json({ message: "An unexpected error occurred" }, { status: 500 });
  }
}