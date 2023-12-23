"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import Link from "next/link";
import { forgotPassword } from "../actions";

const registerSchema = z.object({
  email: z.string().email(),
});

export type ForgotPasswordInput = z.infer<typeof registerSchema>;

export default function SignUpForm() {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const form = useForm<ForgotPasswordInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: ForgotPasswordInput) => {
    setSuccess("Check your email for further instructions");
    const result = await forgotPassword(data);
    if (result?.error) {
      setSuccess(error);
      setError(result.error);
    }
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-muted-foreground"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-muted-foreground">
                  Email Address
                </FormLabel>
                <FormControl>
                  <Input placeholder="Your email address" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {error && (
            <div className="p-3 mt-3 rounded-md bg-destructive/10 border border-destructive">
              <p className="text-sm text-center text-destructive font-medium">
                {error}
              </p>
            </div>
          )}
          {success && (
            <div className="p-3 mt-3 rounded-md bg-secondary/50 border border-border">
              <p className="text-sm text-center text-muted-foreground font-medium">
                {success}
              </p>
            </div>
          )}
          <Button variant="default" className="w-full my-4" type="submit">
            Send Reset Verification Instructions
          </Button>
        </form>
      </Form>
      <Link href="/signup">
        <p className="text-muted-foreground underline text-center text-sm pt-4 pb-2">
          Already have an account? Sign in
        </p>
      </Link>
    </>
  );
}
