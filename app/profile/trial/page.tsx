"use client";

import * as React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { NewProfileInput } from "../new/page";
import { zodResolver } from "@hookform/resolvers/zod";
import { newProfileSchema } from "@/validators/newProfile";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { TrashIcon } from "@heroicons/react/24/outline";

type FormValues = {
  test: {
    firstName: string;
    lastName: string;
  }[];
};

let renderCount = 0;

export default function App() {
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
  const onSubmit = (data: FormValues) => console.log(data);
  renderCount++;

  // important to fill defaultValue with fields, so when input
  // get removed next render will return updated fields value
  console.log(form.watch("skills"));
  const watchTest = form.watch("skills");

  return (
    <div>
      <Form {...form}>
        <form onSubmit={() => console.log("bang")}>
          {fields.map((field, index) => (
            <FormField
              control={form.control}
              name="skills"
              render={({ field }) => (
                <FormItem className="w-full">
                  <div
                    key={field.name}
                    className="flex items-center relative group"
                  >
                    <FormControl>
                      <Input
                        placeholder="Your skill"
                        {...form.register(`skills.${index}.name` as const)}
                      />
                    </FormControl>
                    <TrashIcon
                      className="h-6 w-6 absolute right-1 group-hover:visible invisible hover:text-muted-foreground/50 hover:cursor-pointer text-muted-foreground/70"
                      onClick={() => remove(index)}
                    />
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
          ))}

          <button type="button" onClick={() => append({ name: "" })}>
            Append
          </button>
          {watchTest.map((val) => (
            <p key={val.name}>{val.name}</p>
          ))}
        </form>
      </Form>
    </div>
  );
}
