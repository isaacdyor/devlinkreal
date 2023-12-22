import React from "react";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import ProfileButton from "./ProfileButton";
import Link from "next/link";
import { Button } from "../ui/button";

const AuthComponent = async () => {
  const supabase = createClient(cookies());

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user ? (
    <ProfileButton user={user!} />
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
