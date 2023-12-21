import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { createClient } from "@/utils/supabase/server";
import LogoutButton from "./AuthComponentClient";
import { cookies } from "next/headers";
import AuthComponentClient from "./AuthComponentClient";

const AuthComponent = async () => {
  const supabase = createClient(cookies());

  const {
    data: { user },
  } = await supabase.auth.getUser();

  supabase.auth.onAuthStateChange((event, session) => {
    if (event === "SIGNED_OUT") {
      // rebuild the component
    }
  });

  return <AuthComponentClient user={user} />;
};

export default AuthComponent;
