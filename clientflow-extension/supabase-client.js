// Supabase Client for ClientFlow Extension (No ES Modules)

const SUPABASE_URL = 'https://aiuydsnqgqfdncutjdgz.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFpdXlkc25xZ3FmZG5jdXRqZGd6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjgwOTk2MjEsImV4cCI6MjA4MzY3NTYyMX0.3Vp5uw3dCKdwLinfovHgA_5yHERB10Syj6x6dQ72OLA';

// Supabase client (loaded from CDN in popup.html)
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Helper: Get current user
async function getCurrentUser() {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) throw error;
    return user;
}

// Helper: Check if user is authenticated
async function isAuthenticated() {
    try {
        const user = await getCurrentUser();
        return !!user;
    } catch {
        return false;
    }
}
