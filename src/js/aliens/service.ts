export default class Service implements IAlienService {
	init: ng.IPromise<string[]>;
	get: (name: string) => Alien;
	getMatchingNames: (levels: boolean[], games: IMap<boolean>, exclude?: string[], setup?: string) => string[];

	constructor($http: ng.IHttpService) {
		let service = this,
			aliens: IMap<Alien> = {},
			alien_names: string[] = [];

		service.init = $http.get("data/aliens.json").then(function (result): string[] {
		(result.data as AlienJson).list.forEach(function (alien) {
				aliens[alien.name] = alien;
				alien_names.push(alien.name);
			});
			alien_names.sort();
			return alien_names.slice(0);
		});

		service.get = name => aliens[name] || <Alien>{};
		service.getMatchingNames = function (levels, games, exclude, setup) {
			// remove wrong game/level
			let names = alien_names.filter((name: string): boolean => levels[aliens[name].level] && games[aliens[name].game]);
			// remove specific names
			if (exclude && exclude.length) names = names.filter((name: string): boolean => exclude.indexOf(name) < 0);
			// remove if removing game setup (unless only removing extra color)
			if (setup && setup !== "none") names = names.filter((name: string): boolean => (!aliens[name].setup || (setup === "color" && aliens[name].setup !== "color")));

			return names;
		};
	}
}