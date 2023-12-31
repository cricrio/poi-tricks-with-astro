import type { ClientConfig } from '../supabase';
import SupabaseProvider from '../supabase/provider';

export default class CollectionProvider extends SupabaseProvider {
  userId: string;
  constructor(userId: string, config?: ClientConfig) {
    super(config);
    this.userId = userId;
  }

  getCollections = async (trickIds: string[]) => {
    const { data, error } = await this.supabase
      .from('collections')
      .select('id, trick_id, category')
      .in('trick_id', trickIds)
      .eq('user_id', this.userId);

    if (error) {
      console.error(error);
    }

    return data
      ? data.map(({ id, trick_id, category }) => ({
          id,
          trickId: trick_id,
          category,
        }))
      : [];
  };

  removeById = async (id: string) => {
    const { error } = await this.supabase
      .from('collections')
      .delete()
      .match({ id });

    if (error) {
      console.error(error);
    }
  };

  insert = async ({
    trickId,
    category,
  }: {
    trickId: string;
    category: string;
  }) => {
    const { data, error } = await this.supabase
      .from('collections')
      .insert([{ trick_id: trickId, category, user_id: this.userId }])
      .select('id')
      .single();

    if (error) {
      console.error(error);
    }
    return { id: data?.id };
  };

  getUserCollections = async () => {
    const { data, error } = await this.supabase
      .from('collections')
      .select('id, trick_id (*, creators(name, picture))')
      .eq('user_id', this.userId);

    if (error) {
      console.error(error);
    }

    return data ? data.map(({ trick_id }) => trick_id) : [];
  };
}
