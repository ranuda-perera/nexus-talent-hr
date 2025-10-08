import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ghvxzyzvemxhbqvusiiy.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdodnh6eXp2ZW14aGJxdnVzaWl5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTkyMDcyMCwiZXhwIjoyMDc1NDk2NzIwfQ.0MmhH6mvUDFp5TT-BCp_mFsdMsEhzauwcpLmpvAGJ2c'; // from Project Settings > API > Service Role Key

export const supabase = createClient(supabaseUrl, supabaseKey);
