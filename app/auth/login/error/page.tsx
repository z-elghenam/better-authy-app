import { ReturnButton } from "@/components/return-button";

interface PageProps {
  searchParams: Promise<{ error: string }>;
}

export default async function Page({ searchParams }: PageProps) {
  const error = (await searchParams).error;

  return (
    <div className="px-8 py-16 mx-auto max-w-screen-lg space-y-8 flex items-center justify-center">
      <div className="space-y-4 text-center">
        <h1 className="text-3xl font-bold">Login Error</h1>

        <p className="text-2xl">
          {error === "account_not_linked"
            ? "🛑 This account is already linked to another sign-in method."
            : "Oops! Something went wrong. Please try again."}
        </p>
        <ReturnButton href="/auth/login" label="Login" />
      </div>
    </div>
  );
}
