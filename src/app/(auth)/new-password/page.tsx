"use client";

import { Button } from "@/src/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/src/components/ui/form";

import { Input } from "@/src/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { updatePassword } from "../actions";

const registerSchema = z.object({
  password: z.string().min(6).max(100),
});

export type NewPasswordInput = z.infer<typeof registerSchema>;

export default function NewPassword({
  searchParams,
}: {
  searchParams: { message: string; code: string };
}) {
  const [error, setError] = useState<string | null>(null);
  const form = useForm<NewPasswordInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      password: "",
    },
  });
  const onSubmit = async (data: NewPasswordInput) => {
    const code = searchParams.code;
    const result = await updatePassword(data, code);
    if (result?.error) {
      setError(result.error);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
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
        {error && (
          <div className="p-3 mt-3 rounded-md bg-destructive/10 border border-destructive">
            <p className="text-sm text-center text-destructive font-medium">
              {error}
            </p>
          </div>
        )}
        <Button variant="default" className="w-full my-4" type="submit">
          Update Password
        </Button>
      </form>
    </Form>
  );
}
