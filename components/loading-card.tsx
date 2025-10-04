import { Loader2 } from "lucide-react";
import { Card, CardHeader } from "./ui/card";

type LoadingCardProps = {
  label: string;
};

export const LoadingCard = ({ label }: LoadingCardProps) => {
  return (
    <Card className="w-[600px] shadow-md">
      <CardHeader>
        <h1 className="text-2xl font-semibold text-center">{label}</h1>
      </CardHeader>
      <div className="flex flex-col items-center gap-2">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        <p className="text-sm text-gray-600">Loading session...</p>
      </div>
    </Card>
  );
};
