import type { User } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";

export type UserProfile = {
  id: string;
  credits: number;
  created_at?: string;
};

export async function getUserProfile(user?: User | null) {
  if (!user) {
    console.warn("[supabase] getUserProfile: missing user");
    return { profile: null as UserProfile | null, error: new Error("Missing user") };
  }

  console.log("[supabase] getUserProfile: fetching", { userId: user.id });

  const { data, error } = await supabase
    .from("profiles")
    .select("id, credits, created_at")
    .eq("id", user.id)
    .maybeSingle();

  if (error) {
    console.error("[supabase] getUserProfile: failed", { code: (error as any).code, message: error.message });
    return { profile: null as UserProfile | null, error };
  }

  if (!data) {
    console.warn("[supabase] getUserProfile: no row", { userId: user.id });
    return { profile: null as UserProfile | null, error: null as unknown as null };
  }

  return { profile: data as UserProfile, error: null as unknown as null };
}

export async function addCredits(amount: number, user?: User | null) {
  if (!user) {
    console.warn("[supabase] addCredits: missing user");
    return { newCredits: null as number | null, error: new Error("Missing user") };
  }

  if (!Number.isFinite(amount) || amount <= 0) {
    console.warn("[supabase] addCredits: invalid amount", { amount });
    return { newCredits: null as number | null, error: new Error("Invalid amount") };
  }

  console.log("[supabase] addCredits: calling rpc add_credits_to_user", { userId: user.id, credits_val: amount });

  // Required parameter passing:
  // add_credits_to_user({ credits_val, user_id_val })
  const { data, error } = await supabase.rpc("add_credits_to_user", {
    credits_val: amount,
    user_id_val: user.id,
  });

  if (error) {
    console.error("[supabase] addCredits: rpc failed", { code: (error as any).code, message: error.message });
    return { newCredits: null as number | null, error };
  }

  // Function may return void/null depending on SQL definition.
  // Treat null as "unknown new credits" but still success.
  if (data == null) {
    console.warn("[supabase] addCredits: rpc returned null data (treated as success)");
    return { newCredits: null as number | null, error: null as unknown as null };
  }

  // If the SQL returns integer, data is number.
  if (typeof data === "number") {
    return { newCredits: data, error: null as unknown as null };
  }

  console.warn("[supabase] addCredits: unexpected rpc return type", { data });
  return { newCredits: null as number | null, error: null as unknown as null };
}
