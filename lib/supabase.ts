import 'react-native-url-polyfill/auto';
import { createClient } from '@supabase/supabase-js';
import * as SecureStore from 'expo-secure-store';
import Constants from 'expo-constants';

// Get credentials from app config (set via EAS secrets)
const SUPABASE_URL = Constants.expoConfig?.extra?.supabaseUrl as string;
const SUPABASE_ANON_KEY = Constants.expoConfig?.extra?.supabaseAnonKey as string;

// Secure storage adapter for Expo
const SecureStoreAdapter = {
  getItem: async (key: string) => {
    try {
      return await SecureStore.getItemAsync(key);
    } catch {
      return null;
    }
  },
  setItem: async (key: string, value: string) => {
    try {
      await SecureStore.setItemAsync(key, value);
    } catch {}
  },
  removeItem: async (key: string) => {
    try {
      await SecureStore.deleteItemAsync(key);
    } catch {}
  },
};

// Log Supabase configuration (without exposing sensitive data)
console.log("=== SUPABASE CONFIGURATION ===");
console.log("Supabase URL configured:", !!SUPABASE_URL);
console.log("Supabase URL length:", SUPABASE_URL?.length || 0);
console.log("Supabase Anon Key configured:", !!SUPABASE_ANON_KEY);
console.log("Supabase Anon Key length:", SUPABASE_ANON_KEY?.length || 0);

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storage: SecureStoreAdapter as any,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

// Test Supabase connection
supabase.auth.getSession().then(({ data, error }) => {
  if (error) {
    console.error("❌ Supabase connection test failed:", error);
  } else {
    console.log("✅ Supabase connection test successful");
  }
}).catch(err => {
  console.error("❌ Supabase connection exception:", err);
});