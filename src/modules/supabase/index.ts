import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';
import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { deleteCookie, getCookie, setCookie } from './cookie';

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

export const serverClient = () =>
  createClient<Database>(supabaseUrl, supabaseAnonKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
      detectSessionInUrl: false,
    },
  });

export type Client = ReturnType<typeof createClient<Database>>;

let clientClient: Client;

const customStorageAdapter = {
  getItem: (key: string) => {
    return getCookie(key);
  },
  setItem: (key: string, value: string) => {
    setCookie(key, value);
  },
  removeItem: (key: string) => {
    deleteCookie(key);
  },
};

export const createComponentClient = () => {
  if (!clientClient) {
    clientClient = createClient<Database>(supabaseUrl, supabaseAnonKey, {
      auth: {
        detectSessionInUrl: true,
        flowType: 'pkce',
        storage: customStorageAdapter,
      },
    });
  }
  return clientClient;
};

export const createSSRClient = (Astro: any) =>
  createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      get(key: string) {
        return Astro.cookies.get(key)?.value;
      },
      set(key: string, value: string, options: CookieOptions) {
        Astro.cookies.set(key, value, options);
      },
      remove(key: string, options) {
        Astro.cookies.delete(key, options);
      },
    },
  });

export const getClient = (Astro: any): Client => {
  try {
    if (Astro) {
      return createSSRClient(Astro);
    }
    if (window) {
      return createComponentClient();
    }
  } catch (e) {
    // accessing to window in server throw a error. We can ignore it and return the server client.
    return serverClient();
  }
  return serverClient();
};
