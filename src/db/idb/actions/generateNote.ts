import { Descendant } from "slate";
import { Note } from "../schema/note";
export const DEFAULT_INITIAL: Descendant[] = [
  { type: "paragraph", align: "left", children: [{ text: "" }] },
];

export const generateNote = (
  costum?: Partial<Omit<Note, "createdAt">>
): Note => {
  return {
    id: crypto.randomUUID(),
    title: "",
    content: JSON.stringify(DEFAULT_INITIAL),
    ...(costum || {}),
    createdAt: new Date(),
  };
};
