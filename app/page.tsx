import { GetStartedButton } from "@/components/get-started-button";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-t from-sky-500 to-sky-300">
      <div className="flex flex-col gap-8 items-center justify-center">
        <h1 className="text-4xl font-bold">Better Auth + Next.js</h1>
        <GetStartedButton />
      </div>
    </div>
  );
}
