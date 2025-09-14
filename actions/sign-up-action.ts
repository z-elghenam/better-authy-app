"use server";

import { auth, ErrorCode } from "@/lib/auth";
import { APIError } from "better-auth";

export const signUpAction = async (formData: FormData) => {
  try {
    const name = String(formData.get("name"));
    const email = String(formData.get("email"));
    const password = String(formData.get("password"));

    if (!name) return { error: "please enter your name" };
    if (!email) return { error: "please enter your email" };
    if (!password) return { error: "please enter your password" };

    await auth.api.signUpEmail({
      body: {
        name,
        email,
        password,
      },
    });

    return { error: null };
  } catch (error) {
    if (error instanceof APIError) {
      const errCode = error.body ? (error.body.code as ErrorCode) : "UNKNOWN";

      switch (errCode) {
        case "USER_ALREADY_EXISTS":
          return { error: "Oops! Something went wrong. Please try again." };
        default:
          return { error: error.message };
      }
    }

    return { error: "Internal Server Error" };
  }
};
