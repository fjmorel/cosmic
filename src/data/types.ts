import type { Game } from "./games";
import type { Level } from "./levels";

/** What kind of setup to filter */
export const enum SetupLevel {
  NoSetup = "",
  RequiresExtraColor = "color",
  AnySetup = "all",
}

/** Different kinds of game setup */
export const enum SetupType {
  NoSetup = "",
  HasExtraCards = "cards",
  RequiresExtraColor = "color",
  HasEssenceCards = "essence",
  HasMoreOrLessPlanets = "planets",
  HasDifferentShips = "ships",
  HasTokens = "tokens",
}

/** Whether using a power is required */
export const enum Requirement {
  Optional = "Optional",
  Mandatory = "Mandatory",
  Varies = "Varies",
}

/** Details that I've transcribed for all aliens */
type BasicAlien = Readonly<{
  name: string;
  game: Game;
  power: string;
  level: Level;
  description: string;
  setup: SetupType;
}>;

/** All details about an alien */
export type Alien = BasicAlien &
  Readonly<{
    restriction?: string;
    player?: string;
    mandatory?: Requirement;
    phases?: string;
  }>;

/** Properties that all aliens have */
export type MandatoryAlienProperties = keyof BasicAlien;
