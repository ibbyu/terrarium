import { NextResponse } from "next/server";

import { getServerAuthSession } from "@/server/auth";
import { logger } from "@/lib/winston";
import { updateModDescriptionService } from "@/core/services/mod";
import { updateDescriptionSchema } from "@/core/validation/mod";

export async function PATCH(request: Request, { params: { id } } : { params: { id: string } }) {
  const session = await getServerAuthSession();

  if (!session) {
    logger.info("Failed to update mod description. User not authenticated");

    return NextResponse.json({ message: "Unauthenticated" }, { status: 401 });
  }

  const json = await request.json() as { summary: string };
  const { description } = updateDescriptionSchema.parse(json);

  const result = await updateModDescriptionService({ modId: id, userId: session.user.id, description });

  if (result.doesNotExist) {
    return NextResponse.json({ message: result.doesNotExist }, { status: 404 });
  }

  if (result.unauthorized) {
    return NextResponse.json({ message: result.unauthorized }, { status: 403 });
  }

  if (result.error) {
    return NextResponse.json({ message: result.error }, { status: 500 });
  }

  return NextResponse.json({ message: "Description updated" }, { status: 200 });
}