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
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
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

import { Textarea } from "@/components/ui/textarea";

import { TrashIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";

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

  const router = useRouter();

  const onSubmit = async (data: NewProfileInput) => {
    const result = await addProfile(data)
      .then(() => router.push("/profile"))
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className="w-screen flex justify-center p-8">
      <Card className="max-w-2xl w-full border border-border">
        <CardHeader>
          <CardTitle>Create Profile</CardTitle>
          <CardDescription>Yabba dabba doo</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex-1 flex flex-col w-full justify-center gap-6 text-muted-foreground"
            >
              <div className="flex flex-row gap-4">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="">First name</FormLabel>
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
                      <FormLabel className="">Last name</FormLabel>
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

              <FormField
                control={form.control}
                name="skills"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Skills</FormLabel>
                    <div className="grid grid-cols-2 gap-2">
                      {fields.map((field, index) => (
                        <div key={field.name}>
                          <div className="flex items-center relative group">
                            <FormControl>
                              <Input
                                placeholder="Your skill"
                                className="group-hover:pr-8"
                                {...form.register(
                                  `skills.${index}.name` as const
                                )}
                              />
                            </FormControl>
                            <TrashIcon
                              className="h-6 w-6 absolute right-1 group-hover:visible invisible hover:text-muted-foreground/50 hover:cursor-pointer text-muted-foreground/70"
                              onClick={() => remove(index)}
                            />
                          </div>

                          {form.formState.errors.skills?.[index]?.name && (
                            <p className="text-sm font-medium text-destructive">
                              This can't be empty
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                    <Button
                      type="button"
                      disabled={watchSkills.some((field) => !field.name)}
                      onClick={() => append({ name: "" })}
                      className="max-w-min"
                    >
                      Add Skill
                    </Button>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bio</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Tell us a little bit about yourself"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex flex-row gap-4">
                <FormField
                  control={form.control}
                  name="github"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Github Username</FormLabel>
                      <FormControl>
                        <Input placeholder="Your github username" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="linkedin"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Linkedin Username</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Your linkedin username"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="website"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Website</FormLabel>
                    <FormControl>
                      <Input placeholder="Your website url" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="profilePic"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Profile Picture</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        placeholder="Your website url"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
