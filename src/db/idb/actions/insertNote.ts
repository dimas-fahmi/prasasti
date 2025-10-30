import { StandardizedError } from "@/src/lib/errors";
import { db_dexie } from "..";
import { Note } from "../schema/note";

export async function insertNote(note: Note) {
  const insertion = await db_dexie.notes.add(note);

  if (!insertion) {
    throw new StandardizedError(
      "failed_insertion",
      "Failed to insert note",
      500
    );
  }

  return note.id;
}
