/** Game names */
declare const enum Game {
	Encounter = 'Encounter',
	Alliance = 'Alliance',
	Conflict = 'Conflict',
	Dominion = 'Dominion',
	Incursion = 'Incursion',
	Storm = 'Storm',
	Eons = 'Eons',
}

/** What kind of setup to filter */
declare const enum SetupLevel {
	NoSetup = '',
	RequiresExtraColor = 'color',
	AnySetup = 'all'
}

/** Different kinds of game setup */
declare const enum SetupType {
	NoSetup = '',
	HasExtraCards = 'cards',
	RequiresExtraColor = 'color',
	HasEssenceCards = 'essence',
	HasMoreOrLessPlanets = 'planets',
	HasDifferentShips = 'ships',
	HasTokens = 'tokens'
}

/** Whether using a power is required */
declare const enum Requirement {
	Optional = 'Optional',
	Mandatory = 'Mandatory',
	Varies = 'Varies'
}

/** Details that I've transcribed for all aliens */
type BasicAlien = Readonly<{
	name: string,
	game: Game,
	power: string,
	level: 0 | 1 | 2,
	description: string,
	setup: SetupType
}>;

/** All details about an alien */
type Alien = BasicAlien & Readonly<{
	restriction?: string,
	player?: string,
	mandatory?: Requirement,
	phases?: string
}>

/** Whether games are selected */
type GameSelection = Partial<Record<Game, boolean>>;

declare namespace Alien {
	/** Properties that all aliens have */
	type MandatoryProperties = Array<keyof BasicAlien>;

	/** Properties that I've only transcribed for some aliens */
	type Properties = Array<keyof Alien>;

	/** JSON format of alien data file */
	interface Data {
		list: Alien[]
	}
}
