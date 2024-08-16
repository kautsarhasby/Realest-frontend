import { CircleX } from "lucide-react";

export default function Error() {
  return (
    <main className="bg-slate-900 h-screen flex items-center justify-center">
      <div className="text-red-700 flex items-center gap-2 text-2xl">
        <CircleX size={30} />
        <div>Something Went Error</div>
      </div>
    </main>
  );
}
