import { StandardizedError } from "@/src/lib/errors";
import { db_dexie } from "..";

export async function deleteNote(key: string) {
  try {
    await db_dexie.notes.delete(key);

    return 1;
  } catch (_error) {
    throw new StandardizedError(
      "failed_deletion",
      `Failed to delete note, id:${key}`,
      500
    );
  }
}
