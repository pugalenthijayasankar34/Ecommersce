import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://klawzdsoimebastqjgyt.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtsYXd6ZHNvaW1lYmFzdHFqZ3l0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEyMjg5NDMsImV4cCI6MjA5NjgwNDk0M30.HeHM5mjrGXraFyOlCkgDPX71nhNzJbBXMOokI--cwkc";

export const supabase = createClient(supabaseUrl, supabaseKey);
