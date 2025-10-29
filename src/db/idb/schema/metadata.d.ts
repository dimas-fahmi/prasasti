export interface PrasastiMetadata {
  id: string;
  name: string;
  description?: string;
  owner: string;
  image: string;
  createdAt: Date | string;
  updatedAt?: Date | string;
}
