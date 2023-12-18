import { cookies, headers } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Image from "next/image";
import Logo from "/public/logo.png";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import SocialButton from "@/components/auth/SocialButton";

export default function ForgotPassword({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const signUp = async (formData: FormData) => {
    "use server";

    const origin = headers().get("origin");
    const email = formData.get("email") as string;
    const supabase = createClient(cookies());

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${origin}/new-password`,
    });

    if (error) {
      return redirect("/forgot-password?message=Could not send email");
    }

    return redirect("/forgot-password?message=Emailed reset instructions");
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
        <form
          className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-muted-foreground"
          action={signUp}
        >
          <label className="text-sm" htmlFor="email">
            Email Address
          </label>
          <input
            className="rounded-md px-4 py-2 bg-inherit border outline-ring border-border mb-4 placeholder:text-sm"
            name="email"
            placeholder="Your email address"
            required
          />
          <Button variant="default" className="w-full">
            Send Reset Verification Instructions
          </Button>
          {searchParams?.message && (
            <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
              {searchParams.message}
            </p>
          )}
        </form>
        <Link href="/signup">
          <p className="text-muted-foreground underline text-center text-sm pt-8 pb-2">
            Already have an account? Sign in
          </p>
        </Link>
      </div>
    </div>
  );
}
