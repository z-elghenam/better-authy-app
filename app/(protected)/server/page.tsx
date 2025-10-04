import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { UserInfo } from "@/components/user-info";

export default async function ServerPage() {
  const headersList = await headers();
  const session = await auth.api.getSession({
    headers: headersList,
  });
  if (!session) redirect("/auth/login");

  return <UserInfo user={session.user} label="📱 Client components" />;
}
