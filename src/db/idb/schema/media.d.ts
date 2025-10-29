export interface Media {
  id: string;
  name: string;
  type: MediaType;
  payload: MediaPayload;
  createdAt: Date | string;
  deletedAt?: Date | string;
}

export type MediaType = "image" | "video" | "audio";

export type MediaPayload =
  | { type: "local"; blob: Blob }
  | { type: "embed"; src: string };
