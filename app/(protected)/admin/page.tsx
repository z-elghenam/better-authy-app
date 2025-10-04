import {
  DeleteUserButton,
  PlaceholderDeleteUserButton,
} from "@/components/delete-user-button";
import { ReturnHomeButton } from "@/components/return-home-button";
import { Card, CardHeader } from "@/components/ui/card";
import { UserRoleSelect } from "@/components/user-role-select";
import { auth } from "@/lib/auth";
import { UserRole } from "@/lib/generated/prisma";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function AdminPage() {
  const headersList = await headers();
  const session = await auth.api.getSession({
    headers: headersList,
  });

  if (!session) redirect("/auth/login");

  if (session.user.role !== "ADMIN") {
    return (
      <Card className="w-[600px] shadow-md">
        <CardHeader>
          <p className="text-2xl font-semibold text-center">Admin Dashboard</p>
          <p className="p-2 rounded-md text-lg bg-red-600 text-white font-bold">
            FORBIDDEN
          </p>
        </CardHeader>
      </Card>
    );
  }

  const users = await prisma.user.findMany({
    where: {
      id: {
        not: session.user.id,
      },
    },
    orderBy: {
      name: "asc",
    },
  });

  // const { users } = await auth.api.listUsers({
  //   headers: headersList,
  //   query: {
  //     sortBy: "name",
  //   },
  // });

  const sortedUsers = users.sort((a, b) => {
    if (a.role === "ADMIN" && b.role !== "ADMIN") return 1;
    if (a.role !== "ADMIN" && b.role === "ADMIN") return -1;
    return 0;
  });

  return (
    <Card className="w-[600px] shadow-md">
      <CardHeader>
        <p className="text-2xl font-semibold text-center">Admin Dashboard</p>
        <p className="p-2 rounded-md text-lg bg-green-600 text-white font-bold">
          ACCESS GRANTED
        </p>
      </CardHeader>
      <div className="space-y-4">
        <div className="w-full overflow-x-auto">
          <table className="table-auto min-w-full whitespace-nowrap">
            <thead>
              <tr className="border-b text-sm text-left">
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2 text-center">Role</th>
                <th className="px-4 py-2 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {sortedUsers.map((user) => (
                <tr key={user.id} className="border-b text-sm text-left">
                  <td className="px-4 py-2">{user.id.slice(0, 8)}</td>
                  <td className="px-4 py-2">{user.name}</td>
                  <td className="px-4 py-2">{user.email}</td>
                  <td className="px-4 py-2 text-center">
                    <UserRoleSelect
                      userId={user.id}
                      role={user.role as UserRole}
                    />
                  </td>
                  <td className="px-4 py-2 text-center">
                    {user.role === "USER" ? (
                      <DeleteUserButton userId={user.id} />
                    ) : (
                      <PlaceholderDeleteUserButton />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Card>
  );
}
