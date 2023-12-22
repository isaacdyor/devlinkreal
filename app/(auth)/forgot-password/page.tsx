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
import React from "react";
import Link from "next/link";
import { forgotPassword } from "../actions";

const registerSchema = z.object({
  email: z.string().email(),
});

export type ForgotPasswordInput = z.infer<typeof registerSchema>;

export default function SignUpForm() {
  const form = useForm<ForgotPasswordInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmitHandler = (data: ForgotPasswordInput) => {
    forgotPassword(data).catch(console.error);
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmitHandler)}
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

          <Button variant="default" className="w-full my-4" type="submit">
            Send Reset Verification Instructions
          </Button>
        </form>
      </Form>
      <Link href="/signup">
        <p className="text-muted-foreground underline text-center text-sm pt-8 pb-2">
          Already have an account? Sign in
        </p>
      </Link>
    </>
  );
}
