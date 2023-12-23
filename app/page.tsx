"use client";
import { toast } from "sonner";

export default async function Index() {
  return <button onClick={() => toast.warning("warning")}>Click me</button>;
}
