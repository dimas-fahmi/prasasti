import { StandardizedError } from "@/src/lib/errors";
import { db_dexie } from "..";

export async function deleteMedia(key: string) {
  try {
    await db_dexie.media.delete(key);
  } catch (_error) {
    throw new StandardizedError(
      "failed_deletion",
      `Failed to delete media, id:${key}`,
      500
    );
  }
}
