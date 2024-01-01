"use server";

import { NewProfileInput } from "./new/page";
import { createClient } from "@/src/utils/supabase/server";
import { cookies } from "next/headers";

export const addProfile = async (data: NewProfileInput) => {
  "use server";

  const supabase = createClient(cookies());
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User not found");
  }

  let skillsList = data.skills.map((skill) => skill.name);

  const { error } = await supabase
    .from("profile")
    .insert({
      id: user.id,
      first_name: data.firstName,
      last_name: data.lastName,
      role: data.role,
      skills: skillsList,
      bio: data.bio,
      github: data.github,
      linkedin: data.linkedin,
      website: data.website,
      profile_pic: "https://i.imgur.com/2KZt3YF.png",
      email: user.email,
    })
    .select();
};
