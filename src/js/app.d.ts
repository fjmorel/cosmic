/// <reference types="angular" />
/// <reference types="angular-material" />
/// <reference types="ngstorage" />
/// <reference types="google.analytics" />

declare var angular: angular.IAngularStatic;

type Games = "Encounter" | "Alliance" | "Conflict" | "Dominion" | "Incursion" | "Storm" | "Eons";

interface LevelFilter { (lvl: number): string }

/** All details about an alien */
interface Alien {
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
}

declare namespace Alien {
	/**
	 * The AlienService takes care of downloading data about aliens and enables lookups by name or information.
	 */
	interface Service {
		/**
		 * Promise that returns once data is fetched
		 */
		init: ng.IPromise<string[]>,
		/**
		 * Get information about an alien by its name.
		 * @return Information about alien
		 */
		get(name: string): Alien,
		/**
		 * Get the names of aliens that match given filters
		 * @param levels Array of booleans for Green, Yellow, and Red levels.
		 * @param games Booleans mapped by the initials of base game and expansions
		 * @param exclude Array of alien names to exclude from results
		 * @param setup Which level of game setup to exclude from results 
		 * @return Names of matching aliens
		 */
		getMatchingNames(levels: boolean[], games: Record<Games, boolean>, exclude?: string[], setup?: string): string[]
	}

	/** JSON format of alien data file */
	interface Data extends ng.IHttpPromiseCallbackArg<{}> {
		list: Alien[]
	}
}

declare namespace Generator {
	interface Status {
		aliens: Alien[];
		message: string;
		limit?: number;
	}
	interface AllowedActions {
		draw: boolean;
		hide: boolean;
		show: boolean;
		redo: boolean;
		reset: boolean;
	}
	interface Settings extends ng.storage.IStorageService {
		complexities: boolean[];
		games: Record<Games, boolean>;
		namesExcluded: string[];
		setupLevel: string;
		numToChoose: number;
		preventConflicts: boolean;
	}
}

declare namespace Reference {
	interface Settings extends ng.storage.IStorageService {
		complexities: boolean[];
		games: Record<Games, boolean>;
		orderPref: string[];
		groupPref: (keyof Alien)[];
	}

	interface GroupedItems {
		value: string;
		items: Alien[] | GroupedItems[];
	}
}