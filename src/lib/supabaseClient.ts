import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://vcbthsojdmwopnggkddu.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZjYnRoc29qZG13b3BuZ2drZGR1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIyOTU5MzYsImV4cCI6MjA2Nzg3MTkzNn0.J1MOLs1crS6_iPlPWULKHmeJvOW8rj6-QuihnI2DydI';

export const supabase = createClient(supabaseUrl, supabaseKey);
