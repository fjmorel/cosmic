export class Service implements Alien.Service {
	/** Promise that returns once data is fetched */
	public init: ng.IPromise<string[]>;
	/** Get alien from name */
	public get: (name: string) => Alien;
	/** Get names that match given properties */
	public getMatchingNames: (levels: boolean[], games: Record<Games, boolean>, exclude?: string[], setup?: string) => string[];

	constructor($http: ng.IHttpService) {
		const service = this;
		const aliens: Record<string, Alien> = {};
		const alien_names: string[] = [];

		service.init = $http.get<Alien.Data>("data/aliens2.json").then(function(result): string[] {
			result.data!.list.forEach((alien) => {
				aliens[alien.name] = alien;
				alien_names.push(alien.name);
			});
			alien_names.sort();
			return alien_names.slice(0);
		});

		service.get = name => aliens[name] || {};
		service.getMatchingNames = function(levels, games, exclude, setup) {
			// remove wrong game/level
			let names = alien_names.filter((name: string): boolean => levels[aliens[name].level] && games[aliens[name].game]);
			// remove specific names
			if(exclude && exclude.length) { names = names.filter((name: string): boolean => exclude.indexOf(name) < 0); }
			// remove if removing game setup (unless only removing extra color)
			if(setup && setup !== "none") { names = names.filter((name: string): boolean => (!aliens[name].setup || (setup === "color" && aliens[name].setup !== "color"))); }

			return names;
		};
	}
}