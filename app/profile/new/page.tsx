"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import Link from "next/link";
import { newProfileSchema } from "@/validators/newProfile";
import { addProfile } from "../actions";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { TrashIcon } from "@heroicons/react/24/outline";

export type NewProfileInput = z.infer<typeof newProfileSchema>;

export default function NewProfileForm() {
  const form = useForm<NewProfileInput>({
    resolver: zodResolver(newProfileSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      role: undefined,
      skills: [{ name: "" }],
      bio: "",
      github: "",
      linkedin: "",
      website: "",
      profilePic: "",
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "skills",
  });

  const watchSkills = form.watch("skills");

  const onSubmit = async (data: NewProfileInput) => {
    // setSuccess("Check your email for further instructions");
    const result = await addProfile(data);
  };

  return (
    <div className="w-screen flex justify-center pt-8">
      <Card className="max-w-2xl w-full border border-border">
        <CardHeader>
          <CardTitle>Register</CardTitle>
          <CardDescription>Start the journey with us today.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex-1 flex flex-col w-full justify-center gap-2 text-muted-foreground"
            >
              <div className="flex flex-row gap-4">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="text-muted-foreground">
                        First name
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Your first name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="text-muted-foreground">
                        Last name
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Your last name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your role" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="FULLSTACK">Full Stack</SelectItem>
                        <SelectItem value="FRONTEND">Frontend</SelectItem>
                        <SelectItem value="BACKEND">Backend</SelectItem>
                        <SelectItem value="DESIGN">Design</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormLabel>Role</FormLabel>
              <div className="grid grid-cols-2 gap-2">
                {fields.map((field, index) => (
                  <>
                    <FormField
                      control={form.control}
                      name="skills"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <div className="flex items-center relative group">
                            <FormControl>
                              <Input
                                placeholder="Your skill"
                                {...form.register(
                                  `skills.${index}.name` as const
                                )}
                                onChange={(e) => {
                                  const value = e.target.value;
                                  const updatedFields = [...fields];
                                  updatedFields[index].name = value;
                                }}
                              />
                            </FormControl>

                            <TrashIcon
                              className="h-6 w-6 absolute right-1 group-hover:visible invisible hover:text-muted-foreground/50 hover:cursor-pointer text-muted-foreground/70"
                              onClick={() => remove(index)}
                            />
                          </div>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </>
                ))}
              </div>
              {watchSkills.map((field, index) => (
                <p>{field.name}</p>
              ))}
              {"hello" + fields.some((field) => !field.name)}
              <Button
                type="button"
                // disabled if any of the previous fields are empty
                disabled={fields.some((field) => !field.name)}
                onClick={() => append({ name: "" })}
                className="max-w-min"
              >
                Add Skill
              </Button>
              <Button variant="default" className="w-full my-4" type="submit">
                Submit
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
