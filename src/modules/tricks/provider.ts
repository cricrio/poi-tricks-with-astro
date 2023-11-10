import type { Client } from '@/modules/supabase';

class TrickProvider {
  supabase: Client;

  constructor(supabase: Client) {
    this.supabase = supabase;
  }

  getTricks = async ({
    filter,
    limit,
    count,
  }: {
    filter?: {
      eq?: { key: string; value: string };
      in?: { key: string; values: string[] };
    };
    limit?: number;
    count?: boolean;
  }) => {
    let query = this.supabase
      .from('tricks')
      .select('*', count ? { count: 'exact' } : undefined); // Not sure if this is correct. We don't use everything everywhere. Maybe two view, one for the card and one the detail page

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

  getTrickVideos = async (trickId: string) => {
    const { data, error } = await this.supabase
      .from('videos')
      .select('id, source, externalId')
      .eq('trickId', trickId);
    if (error) {
      console.error(error);
    }
    return data;
  };
}

export default TrickProvider;
