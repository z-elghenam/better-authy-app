"use client";
import { LoadingCard } from "@/components/loading-card";
import { UserInfo } from "@/components/user-info";
import { useSession } from "@/lib/auth-client";
import { redirect } from "next/navigation";

export default function ClientPage() {
  const { data: session, isPending } = useSession();

  if (isPending) {
    return <LoadingCard label="📱 Client components" />;
  }

  if (!session) redirect("/auth/login");

  return <UserInfo user={session.user} label="📱 Client components" />;
}
