import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Image from "next/image";
import Logo from "/public/logo.png";
import { Button } from "@/components/ui/button";

export default function NewPassword({
  searchParams,
}: {
  searchParams: { message: string; code: string };
}) {
  const updatePassword = async (formData: FormData) => {
    "use server";

    const code = searchParams?.code;

    const password = formData.get("password") as string;
    const supabase = createClient(cookies());

    if (code) {
      await supabase.auth.exchangeCodeForSession(code);
    }

    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      console.log(error);
      return redirect("/new-password?message=Could not reset password");
    }

    return redirect("/new-password?message=Successfully reset password");
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
          action={updatePassword}
        >
          <label className="text-sm" htmlFor="password">
            New password
          </label>
          <input
            className="rounded-md px-4 py-2 bg-inherit border border-border outline-ring mb-4 placeholder:text-sm"
            type="password"
            name="password"
            placeholder="New password"
            required
          />
          <Button variant="default" className="w-full">
            Update Password
          </Button>
          {searchParams?.message && (
            <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
              {searchParams.message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
