"use client";

import { signOut } from "@/lib/auth-client";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type SignOutButton = {
  children?: React.ReactNode;
};

export const SignOutButton = ({ children }: SignOutButton) => {
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
    <>
      {children ? (
        <span onClick={handleClick} className="cursor-pointer">
          {children}
        </span>
      ) : (
        <Button
          onClick={handleClick}
          size="sm"
          variant="destructive"
          className="cursor-pointer"
        >
          Sign Out
        </Button>
      )}
    </>
  );
};
