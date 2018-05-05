type Game = "Encounter" | "Alliance" | "Conflict" | "Dominion" | "Incursion" | "Storm" | "Eons";
type SetupLevel = "" | "color" | "all";
type SetupType = "cards" | "color" | "essence" | "planets" | "ships" | "tokens";

/** All details about an alien */
type Alien = Readonly<{
	name: string,
	game: Game,
	power: string,
	level: 0 | 1 | 2,
	description: string,
	setup: "" | SetupType,

	restriction?: string,
	player?: string,
	mandatory?: "Mandatory" | "Optional" | "Varies",
	phases?: string
}>

type GameSelection = Partial<Record<Game, boolean>>;

type GroupedItems<T> = {
	value: string;
	items: T[] | GroupedItems<T>[];
}

declare namespace Alien {
	type Properties = Array<keyof Alien>;

	/** JSON format of alien data file */
	interface Data {
		list: Alien[]
	}
}

declare namespace Generator {
	/** Possible actions in Generator */
	type Actions = "draw" | "hide" | "show" | "redo" | "reset";

	/** Output of the Generator */
	type Status = {
		/** Aliens to disply */
		aliens: string[];
		/** Message to display (errors, # of draws/redos) */
		message: string;
		/** Max draw limit */
		limit?: number;
	};

	interface Settings {
		levels: boolean[];
		games: GameSelection;
		namesExcluded: string[];
		setupLevel: SetupLevel;
		numToChoose: number;
		preventConflicts: boolean;
	}
}

declare namespace Reference {
	interface Settings {
		levels: boolean[];
		games: GameSelection;
		// orderBy: Alien.Properties;
		// groupBy: Alien.Properties;
	}
}