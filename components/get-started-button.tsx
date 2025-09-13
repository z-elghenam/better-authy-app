"use client";

import { useSession } from "@/lib/auth-client";
import { Button } from "./ui/button";
import Link from "next/link";

export const GetStartedButton = () => {
  const { data: session } = useSession();
  const href = session ? "/profile" : "/auth/login";

  return (
    <div className=" text-center space-y-4 w-full">
      {session && (
        <p className="text-lg font-semibold">
          hi, {session?.user.name} welcome back 👋
        </p>
      )}
      <Button size="lg" asChild>
        <Link href={href}>Get started</Link>
      </Button>
    </div>
  );
};
