import api from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export default function useMyGames() {
  return useQuery({
    queryKey: ["my-games"],
    queryFn: () => api.get("api/games/me").json(),
    staleTime: 10_000,
  });
}
