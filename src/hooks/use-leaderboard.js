import api from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export default function useLeaderboard() {
  return useQuery({
    queryKey: ["leaderboard"],
    queryFn: () => api.get("api/leaderboard").json(),
    staleTime: 10_000,
  });
}
