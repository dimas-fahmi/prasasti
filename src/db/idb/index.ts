import Dexie, { EntityTable } from "dexie";
import { PrasastiMetadata } from "./schema/metadata";
import { Media } from "./schema/media";
import { Note } from "./schema/note";

const db_dexie = new Dexie("main") as Dexie & {
  metadata: EntityTable<PrasastiMetadata, "id">;
  medias: EntityTable<Media, "id">;
  notes: EntityTable<Note, "id">;
};

db_dexie.version(1).stores({
  metadata: "&id",
  medias: "&id,name,createdAt,deletedAt",
  notes: "&id,title,createdAt,updatedAt,lastOpenedAt,deletedAt",
});

export { db_dexie };
