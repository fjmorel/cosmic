/** Game names */
export enum Game {
  Encounter = 'Encounter',
  Alliance = 'Alliance',
  Conflict = 'Conflict',
  Dominion = 'Dominion',
  Incursion = 'Incursion',
  Storm = 'Storm',
  Eons = 'Eons',
  Odyssey = 'Odyssey',
  OdysseyAlternate = 'Odyssey (Alternate Timeline)',
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
export type AlienDescriptor = Readonly<{
  name: string;
  game: Game;
  level: 0 | 1 | 2;
  powers: AlienPower[]
}>;

type AlienPower = Readonly<{
  summary: string;
  description: string;
  setup: SetupType;
  restriction?: string;
  player?: string;
  mandatory?: Requirement;
  phases?: string;
  alternate?: boolean;
}>;

export type Alien = Omit<AlienDescriptor, 'powers'> & AlienPower;

/** Whether games are selected */
export type GameSelection = Partial<Record<Game, boolean>>;

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace Alien {
  /** Properties that all aliens have */
  export type MandatoryProperties = (keyof Omit<AlienDescriptor, 'powers'>)[];

  /** Properties that I've only transcribed for some aliens */
  export type Properties = (keyof Alien)[];

  /** JSON format of alien data file */
  export interface Data {
    list: AlienDescriptor[];
  }
}
