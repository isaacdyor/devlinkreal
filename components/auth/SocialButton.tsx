"use client";
import { Button } from "@/components/ui/button";
import { createBrowserClient } from "@supabase/ssr";
import { redirect, usePathname } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import React from "react";
import { Provider } from "@supabase/supabase-js";
import { FaGithub } from "react-icons/fa";

const LoginForm: React.FC<{ provider: Provider }> = ({ provider }) => {
  const pathname = usePathname();
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: provider,
      options: {
        redirectTo: `${location.origin}/auth/callback?next=${pathname}`,
      },
    });

    if (error) {
      return redirect("/login?message=Could not authenticate user");
    }
  };

  if (provider === "google") {
    return (
      <Button
        variant="outline"
        className="w-full mb-2 font-normal text-muted-foreground"
        onClick={() => handleLogin().catch(console.error)}
      >
        <div className="flex items-center gap-2">
          <FcGoogle className="h-5 w-5" />
          <p>Sign in with Google</p>
        </div>
      </Button>
    );
  }

  if (provider === "github") {
    return (
      <Button
        variant="outline"
        className="w-full mb-2 font-normal text-muted-foreground"
        onClick={handleLogin}
      >
        <div className="flex items-center gap-2">
          <FaGithub className="h-5 w-5" />
          <p>Sign in with GitHub</p>
        </div>
      </Button>
    );
  }
};

export default LoginForm;
