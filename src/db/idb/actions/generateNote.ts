import { Note } from "../schema/note";

export const generateNote = (
  costum?: Partial<Omit<Note, "createdAt">>
): Note => {
  return {
    id: crypto.randomUUID(),
    title: "",
    content: [{ text: "" }],
    ...(costum || {}),
    createdAt: new Date(),
  };
};
