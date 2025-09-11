"use client";

import { signOut } from "@/lib/auth-client";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export const SignOutButton = () => {
  const router = useRouter();

  const handleClick = async () =>
    await signOut({
      fetchOptions: {
        onError: (ctx) => {
          toast.error(ctx.error.message);
        },
        onSuccess: () => {
          toast.success("Signed out successfully");
          router.push("/auth/login");
        },
      },
    });

  return (
    <Button onClick={handleClick} size="sm" variant="destructive">
      Sign Out
    </Button>
  );
};
