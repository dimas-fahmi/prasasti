import Dexie from "dexie";
import { db_dexie } from "..";
import { StandardizedError } from "@/src/lib/errors";

export async function getRecentNotes() {
  const notes = await db_dexie.notes
    .where("lastOpenedAt")
    .above(Dexie.minKey)
    .reverse()
    .toArray();

  if (!notes.length) {
    throw new StandardizedError("not_found", "No notes is found", 404);
  }

  return notes;
}
