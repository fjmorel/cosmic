/** Game names */
export const enum Game {
  Encounter = "Encounter",
  Alliance = "Alliance",
  Conflict = "Conflict",
  Dominion = "Dominion",
  Incursion = "Incursion",
  Storm = "Storm",
  Eons = "Eons",
  Odyssey = "Odyssey",
}

/** Whether games are selected */
export type GameSelection = Partial<Record<Game, boolean>>;
