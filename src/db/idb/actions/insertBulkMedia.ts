import { StandardizedError } from "@/src/lib/errors";
import { db_dexie } from "..";
import { Media } from "../schema/media";

export async function insertBulkMedia(media: Media[]) {
  const insertion = await db_dexie.media.bulkAdd(media);

  if (!media) {
    throw new StandardizedError(
      "failed_insertion",
      "Failed to insert media",
      500
    );
  }

  return insertion;
}
