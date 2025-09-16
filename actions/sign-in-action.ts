"use server";

import * as z from "zod";
import { loginSchema } from "@/schemas";
import { auth, ErrorCode } from "@/lib/auth";
import { headers } from "next/headers";
import { APIError } from "better-auth";
import { redirect } from "next/navigation";

export const signInAction = async (values: z.infer<typeof loginSchema>) => {
  try {
    const validatedFields = loginSchema.safeParse(values);
    if (!validatedFields.success) {
      return { error: "Inavlid fields!" };
    }

    await auth.api.signInEmail({
      body: {
        ...validatedFields.data,
      },
      headers: await headers(),
    });

    // ==== MANUALLY SET COOKIES ====
    // const setCookieHeader = res.headers.get("set-cookie");
    // if (setCookieHeader) {
    //   const cookie = parseSetCookieHeader(setCookieHeader);
    //   const cookieStore = await cookies();

    //   const [key, props] = [...cookie.entries()][0];
    //   const value = props.value;
    //   const maxAge = props["max-age"];
    //   const path = props.path;
    //   const httpOnly = props.httponly;
    //   const sameSite = props.samesite;

    //   cookieStore.set(key, decodeURIComponent(value), {
    //     maxAge,
    //     path,
    //     httpOnly,
    //     sameSite,
    //   });
    // }
    // ==============================

    return { error: null };
  } catch (error) {
    if (error instanceof APIError) {
      const errCode = error.body ? (error.body.code as ErrorCode) : "UNKNOWN";
      console.dir(error, { depth: 5 });
      switch (errCode) {
        case "EMAIL_NOT_VERIFIED":
          redirect("/auth/verify?error=email_not_verified");
        default:
          return { error: error.message };
      }
    }

    return { error: "Internal Server Error" };
  }
};
