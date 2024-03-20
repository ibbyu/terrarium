import { v4 as uuidv4 } from 'uuid';
import { logger } from "@/lib/winston";
import { toSlugCase } from "@/core/common/utils";
import { 
  createNewMod,
  deleteModById,
  getModById,
  getModBySlug,
  updateModDescriptionById,
  updateModSummaryById 
} from "@/core/persistence/mod";

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
    logger.error("Failed to create mod, an exception occurred: ", e);

    return { error: "An unexpected error occurred" };
  }
}

interface DeleteModResult {
  doesNotExist?: string;
  error?: string;
  unauthorized?: string;
}


export async function deleteModService({ modId, userId } : { modId: string, userId: string }): Promise<DeleteModResult> {
  try {
    const mod = await getModById(modId);

    if (!mod) {
      logger.info(`Failed to delete mod. Mod does not exists. User Id: '${userId}'`);

      return { doesNotExist: "This mod does not exist" };
    }

    if (mod.ownerId !== userId) {
      logger.info(`Failed to delete mod. Unauthorized. User Id: '${userId}', Mod name: ${mod.name}`);

      return { unauthorized: "Unauthorized" };
    }

    logger.info(`Mod deleted successfully. User Id: '${userId}', Mod name: ${mod.name}`);
    
    await deleteModById(modId);

    return {};
  }

  catch(e) {
    logger.error("Failed to create mod, an exception occurred: ", e);

    return { error: "An unexpected error occurred" };
  }
}

interface UpdateModSummaryResult {
  doesNotExist?: string;
  error?: string;
  unauthorized?: string;
}


export async function updateModSummaryService({ modId, userId, summary } : { modId: string, userId: string, summary: string }): Promise<UpdateModSummaryResult> {
  try {
    const mod = await getModById(modId);

    if (!mod) {
      logger.info(`Failed to update mod summary. Mod does not exists. User Id: '${userId}'`);

      return { doesNotExist: "This mod does not exist" };
    }

    if (mod.ownerId !== userId) {
      logger.info(`Failed to update mod summary. Unauthorized. User Id: '${userId}', Mod name: ${mod.name}`);

      return { unauthorized: "Unauthorized" };
    }

    logger.info(`Mod summary updated. User Id: '${userId}', Mod name: ${mod.name}`);
    
    await updateModSummaryById(modId, summary);

    return {};
  }

  catch(e) {
    logger.error("Failed to update mod summary. An exception occurred: ", e);

    return { error: "An unexpected error occurred" };
  }
}
interface UpdateModDescriptionResult {
  doesNotExist?: string;
  error?: string;
  unauthorized?: string;
}


export async function updateModDescriptionService({ modId, userId, description } : { modId: string, userId: string, description: string }): Promise<UpdateModDescriptionResult> {
  try {
    const mod = await getModById(modId);

    if (!mod) {
      logger.info(`Failed to update mod description. Mod does not exists. User Id: '${userId}'`);

      return { doesNotExist: "This mod does not exist" };
    }

    if (mod.ownerId !== userId) {
      logger.info(`Failed to update mod description. Unauthorized. User Id: '${userId}', Mod name: ${mod.name}`);

      return { unauthorized: "Unauthorized" };
    }

    logger.info(`Mod description updated. User Id: '${userId}', Mod name: ${mod.name}`);
    
    await updateModDescriptionById(modId, description);

    return {};
  }

  catch(e) {
    logger.error("Failed to update mod description. An exception occurred: ", e);

    return { error: "An unexpected error occurred" };
  }
}