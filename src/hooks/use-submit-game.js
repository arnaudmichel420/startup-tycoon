import api from "@/lib/api";
import routes from "@/router/routes";
import { useSoloGameStore } from "@/store/soloGameStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export function useSubmitGame() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const RESET_GAME = useSoloGameStore((state) => state.RESET_GAME);

  return useMutation({
    mutationFn: (game) =>
      api
        .post("api/games", {
          json: {
            mode: game.mode ?? "solo",
            score: game.score,
            duration: game.duration,
            clicks: game.clicks,
            upgrades: game.upgrades,
            displayName: game.displayName,
          },
        })
        .json(),
    onMutate: async (game) => {
      await queryClient.cancelQueries({ queryKey: ["my-games"] });

      const previousMyGames = queryClient.getQueryData(["my-games"]);
      const optimisticGame = {
        id: `optimistic-${Date.now()}`,
        userId: "me",
        displayName: game.displayName,
        mode: game.mode ?? "solo",
        score: game.score,
        duration: game.duration,
        clicks: game.clicks,
        upgrades: game.upgrades,
        createdAt: Date.now(),
      };

      queryClient.setQueryData(["my-games"], (data) => {
        const games = data?.games ?? [];

        return {
          limit: data?.limit ?? 20,
          count: (data?.count ?? games.length) + 1,
          games: [optimisticGame, ...games],
        };
      });

      return { previousMyGames };
    },
    onError: (_error, _game, context) => {
      queryClient.setQueryData(["my-games"], context?.previousMyGames);
    },
    onSuccess: () => {
      RESET_GAME();
      navigate(routes.stats);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["my-games"] });
      queryClient.invalidateQueries({ queryKey: ["leaderboard"] });
    },
  });
}
