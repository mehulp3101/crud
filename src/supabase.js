import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://tawjficqmiqctmtadlzg.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRhd2pmaWNxbWlxY3RtdGFkbHpnIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcyNTkyMTk3MiwiZXhwIjoyMDQxNDk3OTcyfQ.Hh9BfV74ewFaYA73qisraYBDRplnm09ATeACcrdh2-E';
export const supabase = createClient(supabaseUrl, supabaseKey)