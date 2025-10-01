import { Navbar } from "./_components/navbar";

interface ProtectedLayoutProps {
  children: React.ReactNode;
}
function ProtectedLayout({ children }: ProtectedLayoutProps) {
  return (
    <div className="w-full min-h-screen flex flex-col gap-y-10 items-center justify-center bg-sky-600">
      <Navbar />
      {children}
    </div>
  );
}

export default ProtectedLayout;
