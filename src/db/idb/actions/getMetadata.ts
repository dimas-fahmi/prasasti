import { StandardizedError } from "@/src/lib/errors";
import { db_dexie } from "..";

export async function getMetadata() {
  const result = await db_dexie.metadata.toArray();

  if (!result.length) {
    throw new StandardizedError("not_found", "No metadata is found", 404);
  }

  return result?.[0];
}
