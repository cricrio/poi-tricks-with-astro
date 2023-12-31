import { getClient, type Client, type ClientConfig } from '.';

export default class SupabaseProvider {
  supabase: Client;

  constructor(config?: ClientConfig) {
    this.supabase = getClient(config);
  }
}
