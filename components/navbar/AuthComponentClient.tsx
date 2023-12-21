"use client";

import React from "react";
import { Button } from "../ui/button";

import Link from "next/link";
import { User } from "@supabase/supabase-js";
import ProfileButton from "./ProfileButton";

const LogoutButton: React.FC<{ user: User | null }> = ({ user }) => {
  return user ? (
    <ProfileButton user={user} />
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

export default LogoutButton;
