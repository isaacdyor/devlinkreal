import { createClient } from "@/src/utils/supabase/server";
import { cookies } from "next/headers";

export default async function ProfilePage() {
  const supabase = createClient(cookies());

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return <p>you dont have a profile</p>;
  }
  const { data: profile, error } = await supabase
    .from("profile")
    .select()
    .eq("id", user.id)
    .single();

  console.log(profile);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <p>{profile?.bio}</p>
    </div>
  );
}
