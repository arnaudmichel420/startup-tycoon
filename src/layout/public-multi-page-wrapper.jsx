import { Footer } from "@/components/atoms/footer";
import { MultiHeader } from "@/components/atoms/multi-header";
import { Outlet } from "react-router-dom";

export default function PublicMultiPageWrapper() {
  return (
    <div className="min-h-screen bg-linear-to-b from-background via-background to-secondary/35 text-foreground">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col px-4 sm:px-6 lg:px-8">
        <MultiHeader />
        <main className="flex-1 py-8">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
}
