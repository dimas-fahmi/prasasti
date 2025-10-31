import { StandardizedError } from "@/src/lib/errors";
import { db_dexie } from "..";

export async function getNotes() {
  const notes = await db_dexie.notes.orderBy("createdAt").reverse().toArray();

  if (!notes.length) {
    throw new StandardizedError("not_found", "No notes found", 404, notes);
  }

  return notes;
}
