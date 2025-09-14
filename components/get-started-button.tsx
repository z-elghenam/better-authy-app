"use client";

import { useSession } from "@/lib/auth-client";
import { Button } from "./ui/button";
import Link from "next/link";

export const GetStartedButton = () => {
  const { data: session } = useSession();
  const href = session ? "/profile" : "/auth/login";

  return (
    <div className="text-center space-y-4 w-full">
      {session && (
        <p className="flex items-center justify-center gap-2 text-2xl font-medium">
          <span
            data-role={session.user.role}
            className="size-4 rounded-full animate-pulse data-[role=USER]:bg-blue-600 data-[role=ADMIN]:bg-red-600"
          />
          Welcome back, {session.user.name}! 👋
        </p>
      )}

      <Button size="lg" asChild>
        <Link href={href}>Get started</Link>
      </Button>
    </div>
  );
};
