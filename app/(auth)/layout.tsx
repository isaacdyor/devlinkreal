import React from "react";
import Image from "next/image";
import Logo from "/public/logo.png";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const RootLayout: React.FC<{ children: React.ReactNode }> = async ({
  children,
}) => {
  const supabase = createClient(cookies());

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect("/");
  }
  return (
    <div className="flex justify-center">
      <div className="auth max-w-xl w-full border-2 border-border p-8 rounded-xl mt-12">
        <Image
          src={Logo}
          alt="Spark Royalty Logo"
          width={220}
          height={220}
          className="pb-6 h-auto w-auto"
          priority
        />
        {children}
      </div>
    </div>
  );
};

export default RootLayout;
