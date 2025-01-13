import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://rfyittiajtnvhassvmvo.supabase.co"; // URL de tu proyecto
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJmeWl0dGlhanRudmhhc3N2bXZvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY2NDkxMzcsImV4cCI6MjA1MjIyNTEzN30.conFGZW7iaCRS1Rop5YL8MT9smye7zg4AJp_j6Em9KE"; // Clave pública de tu proyecto
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
