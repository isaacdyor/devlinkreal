"use client";

import { SignUpForm, SignupInput } from "@/components/auth/SignupForm";
import { signUp } from "../actions";
import { useState } from "react";
import Link from "next/link";

export default function Login() {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const onSubmit = async (data: SignupInput) => {
    setSuccess("Check your email for further instructions");
    const result = await signUp(data);
    if (result?.error) {
      setSuccess(null);
      setError(result.error);
    }
  };
  return (
    <>
      <SignUpForm
        onSubmit={onSubmit}
        error={error}
        success={success}
        button={"Sign up"}
      />
      <p className="text-muted-foreground underline text-center text-sm py-2">
        <Link href="/signup">Already have an account? Sign in</Link>
      </p>
      {error && <p className="text-red-500">{error}</p>}
    </>
  );
}
