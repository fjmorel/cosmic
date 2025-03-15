import { useQuery } from "@tanstack/react-query";
import { type Alien, SetupLevel, SetupType } from "./types";
import { useState } from "react";
import type { LevelValues, Level } from "./levels";
import type { GameSelection, Game } from "./games";

/** JSON format of alien data file */
type JsonData = {
  list: Alien[];
};

export function useAliens() {
  const { data, isFetching } = useQuery<Alien[]>({
    queryKey: ["aliens"],
    queryFn: async () => {
      const response = await fetch("/cosmic/data/aliens2.json", {
        method: "GET",
      });
      const json = (await response.json()) as JsonData;
      return json.list;
    },
    placeholderData: [],
    staleTime: Infinity,
    gcTime: Infinity,
  });

  const aliens: Record<string, Alien> = {};
  const names: string[] = [];
  if (data) {
    for (const alien of data!) {
      aliens[alien.name] = alien;
      names.push(alien.name);
    }
  }

  return { aliens, names, isLoading: isFetching };
}

export function useFilteredAliens() {
  const { aliens: allAliens, names, isLoading } = useAliens();

  const [levels, setLevels] = useState<LevelValues<boolean>>([
    true,
    true,
    true,
  ]);
  const onLevelChange = (index: Level) => {
    const newLevels = [...levels] as LevelValues<boolean>;
    newLevels[index] = !newLevels[index];
    setLevels(newLevels);
  };

  const [games, setGames] = useState<GameSelection>({ Encounter: true });
  const onGameChange = (index: Game) => {
    setGames({ ...games, [index]: !games[index] });
  };

  const filteredNames = getMatchingNames(allAliens, names, levels, games);
  const matchingAliens = filteredNames.map((x) => allAliens[x]);
  return {
    levels,
    onLevelChange,
    games,
    onGameChange,
    matchingAliens,
    isLoading,
  };
}

/** Get names that match given properties */
export function getMatchingNames(
  aliens: Record<string, Alien>,
  names: string[],
  levels: LevelValues<boolean>,
  games: GameSelection,
  exclude?: string[],
  setup?: SetupLevel,
): string[] {
  return names.filter((name) => {
    const alien = aliens[name];
    // Matches level and game
    return (
      levels[alien.level] &&
      games[alien.game] &&
      // No exclude by name, or not in exclude list
      (!exclude || !exclude.length || exclude.indexOf(name) < 0) &&
      // No setup restriction or no alien setup or (only restrict color and alien setup is not color)
      (!setup ||
        !alien.setup ||
        (setup === SetupLevel.RequiresExtraColor &&
          alien.setup !== SetupType.RequiresExtraColor))
    );
  });
}
