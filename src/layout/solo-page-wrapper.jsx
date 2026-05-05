import { Footer } from "@/components/atoms/footer";
import { SoloHeader } from "@/components/atoms/solo-header";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import {
  IncomeStatCard,
  MoneyStatCard,
} from "../components/molecules/primary-stat-cards";
import { RoundTimerCard } from "../components/molecules/round-timer-card";
import { SoloRoundRecapModal } from "../components/molecules/solo-round-recap-modal";
import { useSoloGameStore } from "../store/soloGameStore";

export default function SoloPageWrapper() {
  const TICK = useSoloGameStore((state) => state.TICK);
  const START_ROUND = useSoloGameStore((state) => state.START_ROUND);
  const money = useSoloGameStore((state) => state.money);
  const incomePerSecond = useSoloGameStore((state) => state.incomePerSecond);
  const remainingSeconds = useSoloGameStore((state) => state.remainingSeconds);
  const roundStatus = useSoloGameStore((state) => state.roundStatus);

  useEffect(() => {
    const interval = setInterval(() => {
      TICK();
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [TICK]);

  return (
    <div className="min-h-screen bg-linear-to-b from-background via-background to-secondary/35 text-foreground">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col px-4 sm:px-6 lg:px-8">
        <SoloHeader />
        <main className="flex-1 py-8">
          <Outlet />
        </main>
        <Footer />
        <div className="fixed right-4 bottom-4 z-30 grid gap-3 sm:right-6 sm:bottom-6">
          <RoundTimerCard
            onStart={START_ROUND}
            remainingSeconds={remainingSeconds}
            status={roundStatus}
          />
          <MoneyStatCard money={money} />
          <IncomeStatCard incomePerSecond={incomePerSecond} />
        </div>
        <SoloRoundRecapModal open={roundStatus === "finished"} />
      </div>
    </div>
  );
}
