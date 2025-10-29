import { StandardizedError } from "@/src/lib/errors";
import { db_dexie } from "..";
import { PrasastiMetadata } from "../schema/metadata";

export async function updateMetadata(
  key: string,
  changes: Partial<PrasastiMetadata>
) {
  const mutation = await db_dexie.metadata.update(key, changes);

  if (!mutation) {
    throw new StandardizedError(
      "failed_mutation",
      `Failed to update metadata. key: ${key}, value: ${changes}`
    );
  }

  return mutation;
}
