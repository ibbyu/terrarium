import { NextResponse } from "next/server";
import { v4 as uuidv4 } from 'uuid';
import { logger } from "@/lib/winston";
import { getServerAuthSession } from "@/server/auth";
import { uploadImageSchema } from "@/core/validation/mod";
import { getModById } from "@/core/persistence/mod";
import { createModImage } from "@/core/persistence/mod-image";

export async function POST(request: Request, { params: { id } } : { params: { id: string } }) {
  try {
    const session = await getServerAuthSession();

    if (!session) {
      logger.info("Upload mod image failed. User is not authenticated.");

      return new NextResponse("Unauthorized", { status: 401 });
    }

    const json = await request.json() as { imageUrl: string };
    const { title, imageUrl } = uploadImageSchema.parse(json);
    
    const mod = await getModById(id);

    if (!mod) {
      logger.info(`Upload mod image failed. Mod not found. Mod id '${id}', User: '${session.user.name}'`);

      return NextResponse.json({ message: "Mod not found" }, { status: 404 });
    }

    if (mod.ownerId !== session.user.id) {
      logger.info(`Upload mod image failed. User does not own this mod. Mod name: '${mod.name}' User: '${session.user.name}'`);

      return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
    }

    await createModImage({ id: uuidv4(), modId: mod.id, title, url: imageUrl });

    logger.info(`Mod image successfully added. Mod name: '${mod.name}' User: '${session.user.name}'`);

    return NextResponse.json({ message: "Image added" }, { status: 200 });
  }
  catch (error) {
    logger.error("Upload mod image failed. An exception occurred: ", error);

    return NextResponse.json({ message: "An unexpected error occurred" }, { status: 500 });
  }
}