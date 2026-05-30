import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = "https://owqdvmkimzmjkgnxhdtg.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im93cWR2bWtpbXptamtnbnhoZHRnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAxNDA4MjQsImV4cCI6MjA5NTcxNjgyNH0.gOM5LJCCEdiyb8YQO5NUGZbIBDxX6w0TeE5Jwxv7EPo";

export const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);