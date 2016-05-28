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
interface IAlienService {
	/**
	 * The .init() method is used to download the Alien data to enable the other methods afterwards.
	 * @return Promise in order to run any callbacks after data has loaded.
	 */
  init: ng.IHttpPromise<string[]>,
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
}
