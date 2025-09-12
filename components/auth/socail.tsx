"use client";

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { Button } from "../ui/button";
import { useSearchParams } from "next/navigation";

export const Social = () => {
  const searchParams = useSearchParams();

  return (
    <div className="flex items-center w-full gap-x-2">
      <Button size="lg" className="flex-1" variant="outline">
        <FcGoogle className="h-5 w-5" />
      </Button>
      <Button size="lg" className="flex-1" variant="outline">
        <FaGithub className="h-5 w-5" />
      </Button>
    </div>
  );
};
