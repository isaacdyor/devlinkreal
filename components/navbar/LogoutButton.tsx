"use client";

import React from "react";
import { Button } from "../ui/button";
import { createClient } from "@/utils/supabase/client";
import { redirect } from "next/navigation";

const LogoutButton = () => {
  const signOut = async () => {
    console.log("signing out");
    const supabase = createClient();
    await supabase.auth.signOut();
    redirect("/login");
  };
  return (
    <Button
      variant="secondary"
      className="w-full"
      onClick={() => signOut().catch(console.error)}
    >
      Log Out
    </Button>
  );
};

export default LogoutButton;
