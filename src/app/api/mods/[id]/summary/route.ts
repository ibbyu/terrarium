import { NextResponse } from "next/server";

import { getServerAuthSession } from "@/server/auth";
import { logger } from "@/lib/winston";
import { updateModSummaryService } from "@/core/services/mod";
import { updateModSummarySchema } from "@/core/validation/mod";

export async function PATCH(request: Request, { params: { id } } : { params: { id: string } }) {
  const session = await getServerAuthSession();

  if (!session) {
    logger.info("Failed to delete mod. User not authenticated");

    return NextResponse.json({ message: "Unauthenticated" }, { status: 401 });
  }

  const json = await request.json() as { summary: string };
  const { summary } = updateModSummarySchema.parse(json);

  const result = await updateModSummaryService({ modId: id, userId: session.user.id, summary });

  if (result.doesNotExist) {
    return NextResponse.json({ message: result.doesNotExist }, { status: 404 });
  }

  if (result.unauthorized) {
    return NextResponse.json({ message: result.unauthorized }, { status: 403 });
  }

  if (result.error) {
    return NextResponse.json({ message: result.error }, { status: 500 });
  }

  return NextResponse.json({ message: "Summary updated" }, { status: 200 });
}