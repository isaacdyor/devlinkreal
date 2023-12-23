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
import { toast } from "sonner";

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(100),
});

export type SignupInput = z.infer<typeof registerSchema>;

export const SignUpForm: React.FC<{
  onSubmit: (data: SignupInput) => Promise<void>;
  error: string | null;
  success?: string | null;
  button: string;
}> = ({ onSubmit, error, button, success }) => {
  const form = useForm<SignupInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return (
    <>
      <SocialButton provider={"google"} />
      <SocialButton provider={"github"} />
      <hr className="border-border my-4" />
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
                  <Input
                    placeholder="Your email address"
                    {...field}
                    autoComplete="on"
                  />
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
                    autoComplete="on"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {success && (
            <div className="p-3 mt-3 rounded-md bg-secondary/50 border border-border">
              <p className="text-sm text-center text-muted-foreground font-medium">
                {success}
              </p>
            </div>
          )}
          <Button variant="default" className="w-full my-3" type="submit">
            {button}
          </Button>
          {error && (
            <div className="p-3 mt-1 mb-4 rounded-md bg-destructive/10 border border-destructive">
              <p className="text-sm text-center text-destructive font-medium">
                {error}
              </p>
            </div>
          )}
        </form>
      </Form>
    </>
  );
};
