import type { NextPage } from "next";
import GameCard from "../components/GameCard";
import {
  Game,
  prefetchedGames,
  useGetGamesQuery,
} from "../hooks/useGetGamesQuery";

const Home: NextPage = () => {
  const { games, loading, error } = useGetGamesQuery<Game[]>();

  if (loading) return <p className="text-white">Loading..</p>;
  if (error) return <p>Error..</p>;

  return (
    <main className="container px-10 my-10 grid md:grid-cols-4 grid-cols-2 gap-4">
      {games?.map((game, index) => (
        <GameCard key={game.id} index={index} game={game} />
      ))}
    </main>
  );
};

export default Home;

export async function getServerSideProps() {
  const dehydratedState = await prefetchedGames();
  return {
    props: {
      dehydratedState,
    },
  };
}
