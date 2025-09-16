"use client";

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { Button } from "../ui/button";
import { signIn } from "@/lib/auth-client";

export const Social = () => {
  const handleClick = async (provider: "google" | "github") =>
    await signIn.social({
      provider: provider,
      callbackURL: "/profile",
      errorCallbackURL: "/auth/login",
    });

  return (
    <div className="flex items-center w-full gap-x-2">
      <Button
        size="lg"
        className="flex-1"
        variant="outline"
        onClick={() => handleClick("google")}
      >
        <FcGoogle className="h-5 w-5" />
      </Button>
      <Button
        size="lg"
        className="flex-1"
        variant="outline"
        onClick={() => handleClick("github")}
      >
        <FaGithub className="h-5 w-5" />
      </Button>
    </div>
  );
};
