/** Game names */
export const enum Game {
  Encounter = 'Encounter',
  Alliance = 'Alliance',
  Conflict = 'Conflict',
  Dominion = 'Dominion',
  Incursion = 'Incursion',
  Storm = 'Storm',
  Eons = 'Eons',
}

/** What kind of setup to filter */
export const enum SetupLevel {
  NoSetup = '',
  RequiresExtraColor = 'color',
  AnySetup = 'all'
}

/** Different kinds of game setup */
export const enum SetupType {
  NoSetup = '',
  HasExtraCards = 'cards',
  RequiresExtraColor = 'color',
  HasEssenceCards = 'essence',
  HasMoreOrLessPlanets = 'planets',
  HasDifferentShips = 'ships',
  HasTokens = 'tokens'
}

/** Whether using a power is required */
export const enum Requirement {
  Optional = 'Optional',
  Mandatory = 'Mandatory',
  Varies = 'Varies'
}

/** Details that I've transcribed for all aliens */
type BasicAlien = Readonly<{
  name: string;
  game: Game;
  power: string;
  level: 0 | 1 | 2;
  description: string;
  setup: SetupType;
}>;

/** All details about an alien */
export type Alien = BasicAlien & Readonly<{
  restriction?: string;
  player?: string;
  mandatory?: Requirement;
  phases?: string;
}>;

/** Whether games are selected */
export type GameSelection = Partial<Record<Game, boolean>>;

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace Alien {
  /** Properties that all aliens have */
  export type MandatoryProperties = (keyof BasicAlien)[];

  /** Properties that I've only transcribed for some aliens */
  export type Properties = (keyof Alien)[];

  /** JSON format of alien data file */
  export interface Data {
    list: Alien[];
  }
}
