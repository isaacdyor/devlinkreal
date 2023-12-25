import prisma from "@/lib/prisma";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Index() {
  const supabase = createClient(cookies());
  const user = await supabase.auth.getUser();
  const profile = await prisma.user.findUnique({
    where: {
      email: user?.data?.user?.email,
    },
  });
  if (user && !profile) {
    redirect("/profile/new");
  }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-6xl font-bold text-center text-accent-foreground">
        Spark Royalty
      </h1>
      <p className="mt-3 text-2xl text-center text-accent-foreground">
        Coming Soon
      </p>
    </div>
  );
}
