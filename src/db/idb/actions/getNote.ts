import { StandardizedError } from "@/src/lib/errors";
import { db_dexie } from "..";

export async function getNote(id: string) {
  const note = await db_dexie.notes.get(id);

  if (!note) {
    throw new StandardizedError(
      "not_found",
      `Can't find note with, id:${id}`,
      404
    );
  }

  return note;
}
