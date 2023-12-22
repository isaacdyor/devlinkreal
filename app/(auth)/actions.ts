"use server";

import { createClient } from "@/utils/supabase/server";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { SignupInput } from "@/components/auth/SignupForm";
import { ForgotPasswordInput } from "./forgot-password/page";
import { NewPasswordInput } from "./new-password/page";

const supabase = createClient(cookies());
const origin = headers().get("origin");

export const signIn = async (data: SignupInput) => {
  "use server";

  const { error } = await supabase.auth.signInWithPassword({
    email: data.email,
    password: data.password,
  });

  if (error) {
    return redirect("/login?message=Could not authenticate user");
  }

  return redirect("/");
};

export const signUp = async (data: SignupInput) => {
  "use server";

  const { error } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
    },
  });

  if (error) {
    return redirect("/login?message=Could not authenticate user");
  }

  return redirect("/");
};

export const forgotPassword = async (data: ForgotPasswordInput) => {
  "use server";

  const { error } = await supabase.auth.resetPasswordForEmail(data.email, {
    redirectTo: `${origin}/new-password`,
  });

  if (error) {
    return redirect("/forgot-password?message=Could not send email");
  }

  if (error) {
    return redirect("/login?message=Could not authenticate user");
  }

  return redirect("/");
};

export const updatePassword = async (
  data: NewPasswordInput,
  code: string | null
) => {
  "use server";

  if (code) {
    await supabase.auth.exchangeCodeForSession(code);
  }

  const { error } = await supabase.auth.updateUser({ password: data.password });

  if (error) {
    return redirect("/forgot-password?message=Could not send email");
  }

  if (error) {
    return redirect("/login?message=Could not authenticate user");
  }

  return redirect("/");
};
