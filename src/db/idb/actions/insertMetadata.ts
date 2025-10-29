import { StandardizedError } from "@/src/lib/errors";
import { db_dexie } from "..";
import { PrasastiMetadata } from "../schema/metadata";

export async function insertMetadata(value: PrasastiMetadata) {
  const insertion = await db_dexie.metadata.add(value);

  if (!insertion) {
    throw new StandardizedError(
      "failed_insertion",
      "Failed to insert metadata",
      500
    );
  }

  return insertion;
}
