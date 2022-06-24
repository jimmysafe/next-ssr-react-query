import { dehydrate, DehydratedState, QueryClient, useQuery } from "react-query";
import { GameApi } from "../helpers/apis/game";

export interface Game {
  id: number;
  title: string;
  thumbnail: string;
  short_description: string;
  game_url: string;
  genre: string;
  platform: string;
  publisher: string;
  developer: string;
  release_date: string;
  freetogame_profile_url: string;
}

const key = "games";

const getGames = async () => {
  return GameApi.shared.get("/api/games");
};

/**
 * SSR Prefetch
 * @returns
 */
export const prefetchedGames = async (): Promise<DehydratedState> => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(key, getGames);
  return dehydrate(queryClient);
};

/**
 * Hook
 * @returns
 */
export function useGetGamesQuery<T>() {
  const { data: games, isLoading, error } = useQuery<T>(key, getGames);

  return { games, loading: isLoading, error };
}
