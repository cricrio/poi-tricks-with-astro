import { type Client } from '@/supabase';

class CollectionProvider {
  supabase: Client;
  userId: string;
  constructor(supabase: Client, userId: string) {
    this.supabase = supabase;
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
}

export default CollectionProvider;
