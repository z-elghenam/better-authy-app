import { ResetPasswordForm } from "@/components/reset-password-form";
import { redirect } from "next/navigation";

interface PageProps {
  searchParams: Promise<{ token: string }>;
}

export default async function Page({ searchParams }: PageProps) {
  const token = (await searchParams).token;

  if (!token) redirect("/auth/login");

  return <ResetPasswordForm token={token} />;
}
