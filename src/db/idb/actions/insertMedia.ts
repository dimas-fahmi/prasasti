import { StandardizedError } from "@/src/lib/errors";
import { db_dexie } from "..";
import { Media } from "../schema/media";

export async function insertMedia(media: Media) {
  const insertion = await db_dexie.media.add(media);

  if (!insertion) {
    throw new StandardizedError(
      "failed_insertion",
      "Failed to insert media",
      500
    );
  }

  return insertion;
}
