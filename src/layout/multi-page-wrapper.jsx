import { Footer } from "@/components/atoms/footer";
import { MultiHeader } from "@/components/atoms/multi-header";
import { RequireAuth } from "@/components/providers/require-auth";
import { Outlet } from "react-router-dom";

export default function MultiPageWrapper() {
  return (
    <RequireAuth>
      <div className="min-h-screen bg-linear-to-b from-background via-background to-secondary/35 text-foreground">
        <div className="mx-auto flex min-h-screen max-w-7xl flex-col px-4 sm:px-6 lg:px-8">
          <MultiHeader />
          <main className="flex-1 py-8">
            <Outlet />
          </main>
          <Footer />
          {/* <div className="fixed right-4 bottom-4 z-30 grid gap-3 sm:right-6 sm:bottom-6">
          <MoneyStatCard money={money} />
          <IncomeStatCard incomePerSecond={incomePerSecond} />
          </div> */}
        </div>
      </div>
    </RequireAuth>
  );
}
