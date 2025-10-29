import { StandardizedError } from "@/src/lib/errors";
import { db_dexie } from "..";
import { PrasastiMetadata } from "../schema/metadata";

export interface UpdateMetadataRequest {
  key: string;
  changes: Partial<PrasastiMetadata>;
}

export async function updateMetadata({ key, changes }: UpdateMetadataRequest) {
  const mutation = await db_dexie.metadata.update(key, changes);

  if (!mutation) {
    throw new StandardizedError(
      "failed_mutation",
      `Failed to update metadata. key: ${key}, value: ${changes}`
    );
  }

  return mutation;
}
