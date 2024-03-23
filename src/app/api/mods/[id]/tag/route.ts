import { NextResponse } from "next/server";
import { type NextRequest } from 'next/server';
import { getServerAuthSession } from "@/server/auth";
import { getModById } from "@/core/persistence/mod";
import { getFeatureTagByName } from "@/core/persistence/feature-tag";
import { createFeatureTagOnMod, deleteFeatureTagOnMod } from "@/core/persistence/feature-tag-on-mod";
import { logger } from "@/lib/winston";

export async function POST(request: NextRequest, { params: { id } }: { params: { id: string } }) {
  try {
    const session = await getServerAuthSession();

    const searchParams = request.nextUrl.searchParams;
    const name = searchParams.get('name');

    if (!name) {
      return NextResponse.json({ message: "Invalid tag name" }, { status: 400 });
    }

    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
    }

    const mod = await getModById(id);

    if (!mod) {
      return NextResponse.json({ message: "Mod not found" }, { status: 400 });
    }

    const tag = await getFeatureTagByName(name);

    if (!tag) {
      return NextResponse.json({ message: "Tag not found" }, { status: 400 });
    }

    await createFeatureTagOnMod(mod.id, tag.id);

    logger.info(`Tag added to mod. Mod name: '${mod.name}', Tag name: '${tag.name}'`);

    return NextResponse.json({ message: "Tag added" }, { status: 200 });
  }
  catch (error) {
    logger.error("An exception occurred: ", error);

    return NextResponse.json({ message: "An unexpected error occurred" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params: { id } }: { params: { id: string } }) {
  try {
    const session = await getServerAuthSession();

    const searchParams = request.nextUrl.searchParams;
    const name = searchParams.get('name');

    if (!name) {
      return NextResponse.json({ message: "Invalid tag name" }, { status: 400 });
    }

    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
    }

    const mod = await getModById(id);

    if (!mod) {
      return NextResponse.json({ message: "Mod not found" }, { status: 400 });
    }

    const tag = await getFeatureTagByName(name);

    if (!tag) {
      return NextResponse.json({ message: "Tag not found" }, { status: 400 });
    }

    await deleteFeatureTagOnMod(tag.id);

    logger.info(`Tag deleted from mod. Mod name: '${mod.name}', Tag name: '${tag.name}'`);

    return NextResponse.json({ message: "Tag removed" }, { status: 200 });
  }
  catch (error) {
    logger.error("An exception occurred: ", error);

    return NextResponse.json({ message: "An unexpected error occurred" }, { status: 500 });
  }
}