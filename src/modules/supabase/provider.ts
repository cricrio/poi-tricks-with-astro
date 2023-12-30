import { getClient, type Client } from '.';

export default class SupabaseProvider {
  supabase: Client;

  constructor(Astro?: any) {
    this.supabase = getClient(Astro);
  }
}
