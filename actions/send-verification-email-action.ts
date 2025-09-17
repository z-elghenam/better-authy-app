"use server";

import { sendVerificationEmail } from "@/lib/auth-client";
import prisma from "@/lib/prisma";

export const sendVerificationEmailAction = async (email: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (user) {
      await sendVerificationEmail({
        email,
        callbackURL: "/auth/verify",
      });
    }

    // Always return success to avoid account enumeration
    return {
      status: "success",
      message: "a verification email has been sent.",
    };
  } catch (error) {
    console.error("sendVerificationEmailAction error:", error);
    return {
      status: "error",
      message: "Oops! Something went wrong. Please try again.",
    };
  }
};
