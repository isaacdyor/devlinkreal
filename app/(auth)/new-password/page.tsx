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
import { forgotPassword, updatePassword } from "../actions";

const registerSchema = z.object({
  password: z.string().min(6).max(100),
});

export type NewPasswordInput = z.infer<typeof registerSchema>;

export default function NewPassword({
  searchParams,
}: {
  searchParams: { message: string; code: string };
}) {
  const form = useForm<NewPasswordInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      password: "",
    },
  });

  const onSubmitHandler = (data: NewPasswordInput) => {
    const code = searchParams.code;
    updatePassword(data, code).catch(console.error);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmitHandler)}
        className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-muted-foreground"
      >
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-muted-foreground">Password</FormLabel>
              <FormControl>
                <Input placeholder="Your password" type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button variant="default" className="w-full my-4" type="submit">
          Update Password
        </Button>
      </form>
    </Form>
  );
}
