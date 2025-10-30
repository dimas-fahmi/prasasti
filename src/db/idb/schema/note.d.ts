export interface Note {
  id: string;
  title?: string;
  content: string;
  parentPage?: string;
  createdAt: Date | string;
  updatedAt?: Date | string;
  lastOpenedAt?: Date | string;
  deletedAt?: Date | string;
}
