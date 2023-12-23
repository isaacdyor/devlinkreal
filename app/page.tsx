import { createClient } from "@/utils/supabase/server";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { signUp } from "./(auth)/actions";

export default async function Index() {
  return <p>hi</p>;
}
