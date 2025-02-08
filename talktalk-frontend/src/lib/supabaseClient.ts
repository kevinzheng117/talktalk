// filepath: /Users/annie/Downloads/talktalk_local/talktalk/talktalk-frontend/src/lib/supabaseClient.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;

export const supabase = createClient("https://lhayczdxenefkmxgdgif.supabase.co",
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxoYXljemR4ZW5lZmtteGdkZ2lmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg5OTU1MjEsImV4cCI6MjA1NDU3MTUyMX0.NOUCLZyrn53x_NOzLzgYEIPWLso0fPZOy4w0GFgWQvs");