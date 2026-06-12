import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://klawzdsoimebastqjgyt.supabase.co";

const supabaseKey = "sb_publishable_QQcvnlN99V-sf_8t7PZglQ_9xJhzrmp";

export const supabase = createClient(supabaseUrl, supabaseKey);
