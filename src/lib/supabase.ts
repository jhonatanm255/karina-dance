import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ntsnljqqodacrqgckmge.supabase.co"; // URL de tu proyecto
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im50c25sanFxb2RhY3JxZ2NrbWdlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY4MTUyMDYsImV4cCI6MjA1MjM5MTIwNn0.IEEIwvOiz58X-dJpdCjkT6OgXOTAf8YJj3BGDeiIW_s"; // Clave pública de tu proyecto
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
