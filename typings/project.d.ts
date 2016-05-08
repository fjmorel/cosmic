/// <reference path="tsd.d.ts" />
interface Map<T> {
  [key: string]: T
}

interface GameNameFilter { (initial: string): string }
interface LevelFilter { (lvl: number): string }

interface GroupedItems {
  value: string,
  items: Object[]
}
interface GroupByFilter {
	(list: Object[], fields: string[]): GroupedItems[]
}

interface Alien {
  name: string,
  game: string,
  power: string,
  level: number,
  description: string,
  setup: string,

  restriction?: string,
  player?: string,
  mandatory?: string,
  phases?: string
}

interface AlienJson extends ng.IHttpPromiseCallbackArg<{}> {
  list: Alien[]
}

/**
 * The AlienService takes care of downloading data about aliens and enables lookups by name or information.
 */
interface AlienService {
	/**
	 * The .init() method is used to download the Alien data to enable the other methods afterwards.
	 * @return Promise in order to run any callbacks after data has loaded.
	 */
  init(): ng.IHttpPromise<string[]>,
	/**
	 * The .get() method is used to get information about an alien by its name.
	 * @return Information about alien
	 */
  get(name: string): Alien,
	/**
	 * The .getMatchingNames() method is used to get the names of aliens that match given filters
	 * @param levels Array of booleans for Green, Yellow, and Red levels.
	 * @param games Booleans mapped by the initials of base game and expansions
	 * @param exclude Array of alien names to exclude from results
	 * @param setup Which level of game setup to exclude from results 
	 * @return Names of matching aliens
	 */
  getMatchingNames(levels: boolean[], games: Map<boolean>, exclude?: string[], setup?: string): string[]
	/**
	 * The .getMatching() method is used to get details about aliens that match given filters
	 * @param levels Array of booleans for Green, Yellow, and Red levels.
	 * @param games Booleans mapped by the initials of base game and expansions
	 * @param exclude Array of alien names to exclude from results
	 * @param setup Which level of game setup to exclude from results 
	 * @return Details of matching aliens
	 */
  getMatching(levels: boolean[], games: Map<boolean>, exclude?: string[], setup?: string): Alien[]
}

declare namespace AlienGenerator {
	export interface Status {
		aliens: Alien[],
		message: string,
		limit?: number
	}

	export interface GeneratorService {
		reset(complexities: boolean[], games: Map<boolean>, namesExcluded: string[], setupLevel: string): Status,
		getAllGiven(): Status,
		getChooseLimit(original: number): number,
		draw(howManyToChoose: number, preventConflicts?: boolean): Status,
		hide(): Status,
		show(): Status,
		redo(howManyToChoose: number, preventConflicts?: boolean): Status,
		init(): ng.IHttpPromise<string[]>,
		getDisabledActions(howManyToChoose: number, numShown: number): AllowedActions,
		getStatus(): string
	}

	export interface AllowedActions {
		draw: boolean,
		hide: boolean,
		show: boolean,
		redo: boolean,
		reset: boolean
	}

	export interface Settings {
		complexities: boolean[],
		games: { E: boolean },
		namesExcluded: string[],
		setupLevel: string,
		numToChoose: number,
		preventConflicts: boolean,
		version: number
	}

	export interface Storage extends ng.storage.IStorageService {
		complexities: boolean[],
		games: { E: boolean },
		namesExcluded: string[],
		setupLevel: string,
		numToChoose: number,
		preventConflicts: boolean,
		version: number
	}
}

declare namespace AlienReference {
	export interface Storage extends ng.storage.IStorageService {
		complexities: boolean[],
		games: { E: boolean },
		orderPref: string[],
		groupPref: string[]
	}
}
