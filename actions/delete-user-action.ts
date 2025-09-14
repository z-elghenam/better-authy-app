"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { APIError } from "better-auth/api";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

export async function deleteUserAction({ userId }: { userId: string }) {
  const headersList = await headers();
  const session = await auth.api.getSession({ headers: headersList });

  if (!session) throw new Error("Unauthorized");
  if (session.user.role !== "ADMIN" || session.user.id === userId) {
    throw new Error("Forbidden");
  }

  try {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user || user.role !== "USER") throw new Error("Forbidden");

    await prisma.user.delete({ where: { id: userId } });
    revalidatePath("/dashboard/admin");
    return { success: true, error: null };
  } catch (err) {
    if (err instanceof APIError) {
      return { success: false, error: err.message };
    }
    console.error(err);
    return { success: false, error: "Internal Server Error" };
  }
}
