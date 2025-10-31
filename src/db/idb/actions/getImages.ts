import { StandardizedError } from "@/src/lib/errors";
import { db_dexie } from "..";

export async function getImages() {
  const images = await db_dexie.media.where("type").equals("image").toArray();

  if (!images.length) {
    throw new StandardizedError("not_found", "No images found", 404);
  }

  return images;
}
