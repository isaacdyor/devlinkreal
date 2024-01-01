import React from "react";
import { createClient } from "@/src/utils/supabase/server";
import { cookies } from "next/headers";
import ProfileButton from "./ProfileButton";
import Link from "next/link";
import { Button } from "../ui/button";

const AuthComponent = async () => {
  const supabase = createClient(cookies());

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data: profile, error } = await supabase
    .from("profile")
    .select()
    .eq("id", user.id)
    .single();

  return user ? (
    <>
      {profile ? (
        <Link
          href="/profile"
          className={`inline-flex h-10 w-full items-center md:w-auto rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground`}
        >
          Profile
        </Link>
      ) : (
        <Link
          href="/profile/new"
          className={`inline-flex h-10 w-full items-center md:w-auto rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground`}
        >
          Create Profile
        </Link>
      )}

      <ProfileButton user={user!} />
    </>
  ) : (
    <>
      <Link href={"/login"} className="md:px-1 w-full md:w-auto">
        <Button variant="secondary" className="w-full">
          Log In
        </Button>
      </Link>
      <Link href="/signup" className="w-full md:w-auto">
        <Button variant="default" className="w-full">
          Sign Up
        </Button>
      </Link>
    </>
  );
};

export default AuthComponent;
