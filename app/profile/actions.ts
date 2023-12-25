"use server";

import prisma from "@/lib/prisma";
import { NewProfileInput } from "./new/page";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export const addProfile = async (data: NewProfileInput) => {
  "use server";

  const supabase = createClient(cookies());
  const email = (await supabase.auth.getUser()).data.user?.email;

  if (!email) {
    throw new Error("User not found");
  }
  try {
    const user = await prisma.user.create({
      data: {
        ...data,
        email: email,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    });
    return user;
  } catch (error) {
    return { message: "Database Error: Failed to create profile" };
  }
};
