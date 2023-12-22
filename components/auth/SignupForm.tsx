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
import SocialButton from "@/components/auth/SocialButton";
import Link from "next/link";

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(100),
});

export type SignupInput = z.infer<typeof registerSchema>;

export const SignUpForm: React.FC<{
  onSubmit: (data: SignupInput) => Promise<any>;
}> = ({ onSubmit }) => {
  const form = useForm<SignupInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmitHandler = (data: SignupInput) => {
    onSubmit(data).catch(console.error);
  };

  return (
    <>
      <SocialButton provider={"google"} />
      <SocialButton provider={"github"} />
      <hr className="border-border my-4" />
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
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-muted-foreground">
                  Password
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Your password"
                    type="password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button variant="default" className="w-full my-4" type="submit">
            Sign In
          </Button>
        </form>
      </Form>

      <p className="text-muted-foreground underline text-center text-sm pt-4">
        <Link href="/forgot-password">Forgot your password?</Link>
      </p>

      <p className="text-muted-foreground underline text-center text-sm py-2">
        <Link href="/signup">Don't have an account? Sign up</Link>
      </p>
    </>
  );
};
