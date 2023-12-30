import SupabaseProvider from '../supabase/provider';

class TrickProvider extends SupabaseProvider {
  getTricks = async ({
    filter,
    limit,
    count,
    edges,
  }: {
    filter?: {
      eq?: { key: string; value: string };
      in?: { key: string; values: string[] };
    };
    edges?: {
      creators?: boolean;
      videos?: boolean;
    };
    limit?: number;
    count?: boolean;
  } = {}) => {
    const from = this.supabase.from('tricks');

    let query = (() => {
      if (edges?.creators && edges?.videos) {
        return from.select(
          '*, creators(name, picture), videos(source, externalId)',
          count ? { count: 'exact' } : undefined
        );
      }
      if (edges?.creators) {
        return from.select(
          '*, creators(id, name, picture)',
          count ? { count: 'exact' } : undefined
        );
      }
      if (edges?.videos) {
        return from.select(
          '*, videos(source, externalId)',
          count ? { count: 'exact' } : undefined
        );
      }
      return from.select('*', count ? { count: 'exact' } : undefined);
    })();

    if (filter?.eq) {
      query = query.eq(filter.eq.key, filter.eq.value);
    }
    if (filter?.in) {
      query = query.in(filter.in.key, filter.in.values);
    }
    if (limit) {
      query.limit(limit);
    }

    const { data, count: trickCount, error } = await query;
    if (error) {
      console.error(error);
    }

    return { data, count: trickCount };
  };
}

export default TrickProvider;
