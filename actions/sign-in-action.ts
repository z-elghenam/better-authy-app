"use server";

import * as z from "zod";
import { loginSchema } from "@/schemas";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { APIError } from "better-auth";

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
  } catch (error: any) {
    if (error instanceof APIError) {
      return { error: error.message };
    }

    return { error: "Internal Server Error" };
  }
};
