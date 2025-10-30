export interface UpdateRequest<TModel> {
  key: string;
  changes: Partial<TModel>;
}
