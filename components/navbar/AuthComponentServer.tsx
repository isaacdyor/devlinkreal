import React from "react";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import AuthComponentClient from "./AuthComponentClient";
import { redirect } from "next/navigation";

export const revalidate = 0;

const AuthComponent = async () => {
  const supabase = createClient(cookies());

  const {
    data: { user },
  } = await supabase.auth.getUser();

  supabase.auth.onAuthStateChange((event, session) => {
    if (event === "SIGNED_OUT") {
      redirect("/login");
    }
  });

  return <AuthComponentClient user={user} />;
};

export default AuthComponent;
