import { Node } from "slate";

export interface Note {
  id: string;
  title?: string;
  content: Node[];
  parentPage?: string;
  createdAt: Date | string;
  updatedAt?: Date | string;
  lastOpenedAt?: Date | string;
  deletedAt?: Date | string;
}
