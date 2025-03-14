import { useQuery } from "@tanstack/react-query";
import { type Alien, type GameSelection, SetupLevel, SetupType } from "./types";

export function useAliens() {
  const { data } = useQuery<Alien.Data>({
    queryKey: ["aliens"],
    queryFn: async () => {
      const response = await fetch("data/aliens2.json", { method: "GET" });
      const json = await response.json();
      console.log(json);
      return json as Alien.Data;
    },
    placeholderData: {
      list: [],
    },
  });

  const aliens: Record<string, Alien> = {};
  const names: string[] = [];
  if (data) {
    for (const alien of data!.list) {
      aliens[alien.name] = alien;
      names.push(alien.name);
    }
  }

  return { aliens, names };
}

/** Get names that match given properties */
export function getMatchingNames(
  aliens: Record<string, Alien>,
  names: string[],
  levels: boolean[],
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
