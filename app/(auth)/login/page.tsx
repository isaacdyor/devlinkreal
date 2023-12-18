import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Image from "next/image";
import Logo from "/public/logo.png";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import SocialButton from "@/components/auth/SocialButton";

export default function Login({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const signIn = async (formData: FormData) => {
    "use server";

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const supabase = createClient(cookies());

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return redirect("/login?message=Could not authenticate user");
    }

    return redirect("/");
  };

  return (
    <div className="flex justify-center">
      <div className="auth max-w-xl w-full border-2 border-border p-8 rounded-xl mt-12">
        <Image
          src={Logo}
          alt="Spark Royalty Logo"
          width={220}
          height={220}
          className="pb-6"
        />
        <SocialButton provider={"google"} />
        <SocialButton provider={"github"} />
        <hr className="border-border my-4" />
        <form
          className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-muted-foreground"
          action={signIn}
        >
          <label className="text-sm" htmlFor="email">
            Email Address
          </label>
          <input
            className="rounded-md px-4 py-2 bg-background border outline-ring border-border mb-4 placeholder:text-sm"
            name="email"
            placeholder="Your email address"
            required
          />
          <label className="text-sm" htmlFor="password">
            Password
          </label>
          <input
            className="rounded-md px-4 py-2 border bg-background border-border outline-ring mb-6 placeholder:text-sm"
            type="password"
            name="password"
            placeholder="Your password"
            required
          />
          <Button variant="default" className="w-full">
            Sign in
          </Button>
          {searchParams?.message && (
            <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
              {searchParams.message}
            </p>
          )}
        </form>

        <p className="text-muted-foreground underline text-center text-sm pt-8">
          <Link href="/forgot-password">Forgot your password?</Link>
        </p>

        <p className="text-muted-foreground underline text-center text-sm py-2">
          <Link href="/signup">Don't have an account? Sign up</Link>
        </p>
      </div>
    </div>
  );
}
