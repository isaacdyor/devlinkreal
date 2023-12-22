"use client";

import { SignUpForm } from "@/components/auth/SignupForm";
import { signUp } from "../actions";

export default function Signup() {
  return <SignUpForm onSubmit={signUp} />;
}
