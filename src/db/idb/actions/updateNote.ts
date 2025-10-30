import { StandardizedError } from "@/src/lib/errors";
import { db_dexie } from "..";
import { Note } from "../schema/note";
import { UpdateRequest } from "./types";

export async function updateNote({ key, changes }: UpdateRequest<Note>) {
  const mutation = await db_dexie.notes.update(key, changes);

  if (!mutation) {
    throw new StandardizedError(
      "failed_mutation",
      `Failed to mutate note, id: ${key}`,
      500
    );
  }

  return mutation;
}
