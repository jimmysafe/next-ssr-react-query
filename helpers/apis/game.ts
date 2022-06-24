import { HttpClient } from "../client";

/**
 * Get User URL from environment variables
 * @returns User API URL
 */
const getUrl = () => {
  const url = "https://free-to-play-games-database.p.rapidapi.com";
  if (!url || url.trim().length === 0)
    throw new Error("No User API URL provided");

  return url;
};

export class GameApi extends HttpClient {
  public static readonly shared = new GameApi();

  public constructor() {
    super(getUrl());
  }
}
