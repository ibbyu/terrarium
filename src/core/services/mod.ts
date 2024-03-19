import { v4 as uuidv4 } from 'uuid';
import { logger } from "@/lib/winston";
import { toSlugCase } from "@/core/common/utils";
import { createNewMod, getModBySlug } from "@/core/persistence/mod";

interface CreateNewModResult {
  alreadyExists?: string;
  slug?: string;
  error?: string;
  unauthenticated?: string;
}

export async function createNewModService({ name, summary, username, userId }: { name: string, summary: string, username: string, userId: string }): Promise<CreateNewModResult> {
  try {
    const slug = toSlugCase(name);

    const exists = await getModBySlug(slug);

    if (exists) {
      logger.info(`Failed to create mod. Mod already exists. User: '${username}', Mod name: '${name}'`);

      return { alreadyExists: "This mod already exists" };
    }

    const mod = { id: uuidv4(), name, slug, summary, ownerId: userId };

    await createNewMod(mod);

    logger.info(`Mod successfully created. User: '${username}', Mod name: '${name}'`);

    return { slug };
  }
  catch (e) {
    logger.error("Failed to create mod, an exception occurred.", e);

    return { error: "An unexpected error occurred" };
  }
}