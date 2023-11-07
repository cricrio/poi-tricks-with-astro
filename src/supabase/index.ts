import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

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

export const createComponentClient = () => {
  if (!clientClient) {
    clientClient = createClient<Database>(supabaseUrl, supabaseAnonKey, {
      auth: {
        storage: sessionStorage,
      },
    });
  }
  return clientClient;
};

// export const supabaseClient = createClient(supabaseUrl, supabaseAnonKey, {
//   auth: {
//     storage: sessionStorage,
//   },
// });
