import SupabaseProvider from '@/modules/supabase/provider';

export default class CreatorProvider extends SupabaseProvider {
  getTricksByCreator = async (creatorId: string) => {
    const { data, error } = await this.supabase
      .from('creators')
      .select('id, tricks(*, creators(name, picture))')
      .eq('id', creatorId)
      .single();

    if (error) {
      console.error(error);
    }

    return data?.tricks ?? [];
  };

  getCreators = async ({
    limit,
    count,
  }: {
    limit?: number;
    count?: boolean;
  } = {}) => {
    let query = this.supabase
      .from('creators')
      .select('id, name, picture', count ? { count: 'exact' } : undefined);

    if (limit) {
      query = query.limit(limit);
    }

    const { data, count: creatorCount, error } = await query;
    if (error) {
      console.error(error);
    }
    return { data, count: creatorCount };
  };
}
