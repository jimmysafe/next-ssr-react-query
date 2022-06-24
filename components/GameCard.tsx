import React from "react";
import Image from "next/image";
import { Game } from "../hooks/useGetGamesQuery";
import { motion } from "framer-motion";

type GameCardProps = {
  game: Game;
  index: number;
};

const GameCard = ({ game, index }: GameCardProps) => {
  return (
    <motion.div
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{ once: true }}
      initial={{ opacity: 0, y: 30 }}
      transition={{ duration: 0.5, delay: index / 1000 }}
      className="rounded bg-gray-700 shadow-sm overflow-hidden"
    >
      <div className="w-full h-40 relative">
        <Image
          src={game.thumbnail}
          alt={game.title}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="p-4">
        <p className="text-white mb-2">{game.title}</p>
        <p className="text-gray-300 text-sm truncate">
          {game.short_description}
        </p>
      </div>
    </motion.div>
  );
};

export default GameCard;
