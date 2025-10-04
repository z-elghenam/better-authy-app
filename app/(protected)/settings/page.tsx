import { EditUserDialog } from "@/components/edit-user-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { UpdatePasswordDialog } from "@/components/update-password-dialog";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { FaUser } from "react-icons/fa";

export default async function SettingsPage() {
  const headersList = await headers();
  const session = await auth.api.getSession({
    headers: headersList,
  });

  if (!session) redirect("/auth/login");
  const user = session?.user;

  return (
    <Card className="w-[600px] shadow">
      <CardHeader>
        <h1 className="text-2xl font-semibold text-center">⚙ Settings</h1>
      </CardHeader>
      <CardContent>
        <div className="border rounded-xl p-2 mb-4">
          <div className="flex items-center gap-2">
            <Avatar className="w-24 h-24 rounded-lg object-cover">
              <AvatarImage
                src={user?.image || undefined}
                className="object-cover rounded-lg w-full h-full"
              />
              <AvatarFallback className="bg-sky-500 flex items-center justify-center rounded-lg">
                <FaUser className="text-white text-xl" />
              </AvatarFallback>
            </Avatar>

            <div className="divide-y-1 flex-1">
              <div className="grid grid-cols-2 px-2 py-3">
                <h3 className="text-md font-semibold">Full name:</h3>
                <p className="text-sm font-semibold uppercase">{user?.name}</p>
              </div>
              <div className="grid grid-cols-2 px-2 py-3">
                <p className="text-md font-semibold">Email:</p>
                <p className="text-sm font-semibold">{user?.email}</p>
              </div>

              <div className="grid grid-cols-2 px-2 py-3">
                <p className="text-md font-semibold">Role:</p>
                <p className="text-sm font-semibold uppercase">{user?.role}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col space-y-2 w-full">
          <EditUserDialog image={user.image || undefined} name={user.name} />
          <UpdatePasswordDialog />
        </div>
      </CardContent>
    </Card>
  );
}
