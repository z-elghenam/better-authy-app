import { headers } from "next/headers";
import { Navbar } from "./_components/navbar";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

interface ProtectedLayoutProps {
  children: React.ReactNode;
}
async function ProtectedLayout({ children }: ProtectedLayoutProps) {
  const headersList = await headers();
  const session = await auth.api.getSession({
    headers: headersList,
  });
  if (!session) redirect("/auth/login");

  return (
    <div className="w-full min-h-screen flex flex-col gap-y-10 items-center justify-center bg-sky-600">
      <Navbar user={session.user} />
      {children}
    </div>
  );
}

export default ProtectedLayout;
