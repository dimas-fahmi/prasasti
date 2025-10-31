import { Note } from "@/src/db/idb/schema/note";
import { validateChildren } from "./validateChildren";
import { Node } from "slate";

const getOverview = (note: Note) => {
  const raw = note?.content;
  const parsed = raw ? JSON.parse(raw) : undefined;

  if (!parsed) return "No content";

  const isValid = validateChildren(parsed);

  if (!isValid) return "No content";

  const string = Node.string(parsed?.[0]);

  return string || "No content";
};

export default getOverview;
