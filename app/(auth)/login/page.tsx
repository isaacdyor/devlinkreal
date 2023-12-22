"use client";

import { SignUpForm } from "@/components/auth/SignupForm";
import { signIn } from "../actions";

export default function Signup() {
  return <SignUpForm onSubmit={signIn} />;
}
