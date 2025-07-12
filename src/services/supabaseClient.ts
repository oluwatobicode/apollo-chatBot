import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://txqdbjsnojxjypjcxfzy.supabase.com";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR4cWRianNub2p4anlwamN4Znp5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA5NDYwMDYsImV4cCI6MjA2NjUyMjAwNn0VFYmIhBIw755Suor1DiecChWgbqrFups6Yd0WFw6m3w";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
