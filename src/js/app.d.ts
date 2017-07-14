type Games = "Encounter" | "Alliance" | "Conflict" | "Dominion" | "Incursion" | "Storm" | "Eons";
type SetupLevel = "" | "color" | "all";

/** All details about an alien */
type Alien = Readonly<{
	name: string,
	game: Games,
	power: string,
	level: 0 | 1 | 2,
	description: string,
	setup: "cards" | "color" | "essence" | "planets" | "ships" | "tokens",

	restriction?: string,
	player?: string,
	mandatory?: "Mandatory" | "Optional" | "Varies",
	phases?: string
}>

type GameSelection = Partial<Record<Games, boolean>>;

declare namespace Alien {
	type Properties = (keyof Alien)[];

	/** JSON format of alien data file */
	interface Data {
		list: Alien[]
	}
}

declare namespace Generator {
	type Actions = "draw" | "hide" | "show" | "redo" | "reset";
	type Status = {
		aliens: string[];
		message: string;
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
		orderBy: Alien.Properties;
		groupBy: Alien.Properties;
	}

	type GroupedItems = {
		value: string;
		items: Alien[] | GroupedItems[];
	}
}