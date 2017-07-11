type Games = "Encounter" | "Alliance" | "Conflict" | "Dominion" | "Incursion" | "Storm" | "Eons";


/** All details about an alien */
type Alien = Readonly<{
	name: string,
	game: Games,
	power: string,
	level: number,
	description: string,
	setup: string,

	restriction?: string,
	player?: string,
	mandatory?: string,
	phases?: string
}>

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
		aliens: Alien[];
		message: string;
		limit?: number;
	};

	interface Settings {
		complexities: boolean[];
		games: Record<Games, boolean>;
		namesExcluded: string[];
		setupLevel: string;
		numToChoose: number;
		preventConflicts: boolean;
	}
}

declare namespace Reference {
	interface Settings {
		complexities: boolean[];
		games: Record<Games, boolean>;
		orderPref: Alien.Properties;
		groupPref: Alien.Properties;
	}

	type GroupedItems = {
		value: string;
		items: Alien[] | GroupedItems[];
	}
}