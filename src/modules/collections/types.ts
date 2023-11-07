export type UpdateCollectionAction = {
  type: 'add' | 'remove';
  trickId: string;
  category: string;
  id?: string;
};
