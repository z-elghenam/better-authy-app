import { SignOutButton } from "@/components/sign-out-button";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const session = await auth.api.getSession({
    headers: await headers(), // some endpoint might require headers
  });

  if (!session) return redirect("/auth/login");

  return (
    <div className="px-8 py-16 container mx-auto max-w-screen-lg space-y-8">
      <SignOutButton />
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">Profile</h1>

        <p>{JSON.stringify(session, null, 2)}</p>
      </div>
    </div>
  );
}
