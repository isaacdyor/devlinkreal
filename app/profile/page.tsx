import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export default async function ProfilePage() {
  const supabase = createClient(cookies());

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: profile, error } = await supabase
    .from("profile")
    .select()
    .eq("id", user?.id);

  console.log(profile);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <p>{profile?.map}</p>
    </div>
  );
}
