import Dexie, { EntityTable } from "dexie";
import { PrasastiMetadata } from "./schema/metadata";
import { Media } from "./schema/media";
import { Note } from "./schema/note";

const db_dexie = new Dexie("main") as Dexie & {
  metadata: EntityTable<PrasastiMetadata, "id">;
  media: EntityTable<Media, "id">;
  notes: EntityTable<Note, "id">;
};

db_dexie.version(1).stores({
  metadata: "&id",
  media: "&id,name,createdAt,deletedAt,type",
  notes: "&id,title,createdAt,updatedAt,lastOpenedAt,deletedAt",
});

export { db_dexie };
