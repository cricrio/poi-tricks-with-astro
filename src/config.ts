export const difficultyLevels = [
  'beginner',
  'intermediate',
  'advanced',
  'others',
];

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

export const redirectUrl = import.meta.env.PUBLIC_REDIRECT_URL;

export const supabaseParams = {
  supabaseAnonKey,
  supabaseUrl,
};
