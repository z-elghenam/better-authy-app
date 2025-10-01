import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default async function ServerPage() {
  const headersList = await headers();
  const session = await auth.api.getSession({
    headers: headersList,
  });
  const user = session?.user;

  if (!session) redirect("/auth/login");

  return (
    <Card className="w-[600px] shadow-md">
      <CardHeader>
        <p className="text-2xl font-semibold text-center">
          📱 Client components
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
          <p className="text-sm font-medium">ID</p>
          <p className="truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 dark:bg-slate-800 rounded-md">
            {user?.id}
          </p>
        </div>
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
          <p className="text-sm font-medium">Name</p>
          <p className="truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 dark:bg-slate-800 rounded-md">
            {user?.name}
          </p>
        </div>
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
          <p className="text-sm font-medium">Email</p>
          <p className="truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 dark:bg-slate-800 rounded-md">
            {user?.email}
          </p>
        </div>
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
          <p className="text-sm font-medium">Role</p>
          <p className="truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 dark:bg-slate-800 rounded-md">
            {user?.role}
          </p>
        </div>

        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
          <p className="text-sm font-medium">Two Factor Authentication</p>
        </div>
      </CardContent>
    </Card>
  );
}
