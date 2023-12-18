import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { createClient } from "@/utils/supabase/server";
import LogoutButton from "./LogoutButton";
import { cookies } from "next/headers";

const AuthComponent = async () => {
  const supabase = createClient(cookies());

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // return user ? (
  //   <div className="flex items-center gap-4">
  //     Hey, {user.email}!
  //     <LogoutButton />
  //   </div>
  // ) : (
  //   <>
  //     <Link href={"/login"} className="md:px-1 w-full md:w-auto">
  //       <Button variant="secondary" className="w-full">
  //         Log In
  //       </Button>
  //     </Link>
  //     <Link href="/signup" className="w-full md:w-auto">
  //       <Button variant="default" className="w-full">
  //         Sign Up
  //       </Button>
  //     </Link>
  //   </>
  // );
  return <p>hello</p>;
};

export default AuthComponent;
