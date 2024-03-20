import { NextResponse } from "next/server";

import { getServerAuthSession } from "@/server/auth";
import { logger } from "@/lib/winston";
import { deleteModService } from "@/core/services/mod";

export async function DELETE(request: Request, { params: { id } } : { params: { id: string } }) {
  const session = await getServerAuthSession();

  if (!session) {
    logger.info("Failed to delete mod. User not authenticated");

    return NextResponse.json({ message: "Unauthenticated" }, { status: 401 });
  }

  const result = await deleteModService({ modId: id, userId: session.user.id });

  if (result.doesNotExist) {
    return NextResponse.json({ message: result.doesNotExist }, { status: 404 });
  }

  if (result.unauthorized) {
    return NextResponse.json({ message: result.unauthorized }, { status: 403 });
  }

  if (result.error) {
    return NextResponse.json({ message: result.error }, { status: 500 });
  }

  return NextResponse.json({ message: "Mod deleted" }, { status: 200 });
}