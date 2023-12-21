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
import { createClient } from "@/utils/supabase/client";
import { redirect, useRouter } from "next/navigation";
import Link from "next/link";

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(100),
});

type Input = z.infer<typeof registerSchema>;

export default function Home() {
  const supabase = createClient();
  const router = useRouter();

  const form = useForm<Input>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const submit = async (data: Input) => {
    console.log(data);
    const { error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });

    if (error) {
      return router.push("/login?message=Could not authenticate user");
    }
    router.refresh();
    router.push("/");
  };

  const onSubmit = (data: Input) => {
    submit(data).catch(console.error);
  };

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
            Sign poop
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
}
