import { ConfirmModal } from "@/components/molecules/confirm-modal";
import { useGameStore } from "../../store/gameStore";

export default function Settings() {
  const RESET_GAME = useGameStore((state) => state.RESET_GAME);
  return (
    <>
      <h1 className="text-3xl font-bold">Settings</h1>
      <div className="mt-3 flex flex-col gap-2 items-start w-fit">
        <ConfirmModal onClick={() => RESET_GAME()} />
      </div>
    </>
  );
}
