import { Media } from "./media";

export interface PrasastiMetadata {
  id: string;
  name: string;
  description?: string;
  owner: string;
  image?: Media;
  createdAt: Date | string;
  updatedAt?: Date | string;
}
