"use client";

import { SignUpForm, SignupInput } from "@/components/auth/SignupForm";
import { signIn } from "../actions";
import { toast } from "sonner";
import { useState } from "react";
import Link from "next/link";

export default function Login() {
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (data: SignupInput) => {
    const result = await signIn(data);
    if (result?.error) {
      setError(result.error);
    }
  };
  return (
    <>
      <SignUpForm onSubmit={onSubmit} error={error} button={"Sign in"} />
      <p className="text-muted-foreground underline text-center text-sm pt-4">
        <Link href="/forgot-password">Forgot your password?</Link>
      </p>

      <p className="text-muted-foreground underline text-center text-sm py-2">
        <Link href="/signup">Don't have an account? Sign up</Link>
      </p>
    </>
  );
}
