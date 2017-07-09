import { Injectable } from "@angular/core";
import { Http } from "@angular/http";

import "rxjs/add/operator/map";
import "rxjs/add/operator/toPromise";

@Injectable()
export class AlienService implements Alien.Service {/** Promise that returns once data is fetched */
	public init: Promise<string[]>;
	/** Get alien from name */
	public get: (name: string) => Alien;
	/** Get names that match given properties */
	public getMatchingNames: (levels: boolean[], games: Games[], exclude?: string[], setup?: string) => string[];

	constructor(http: Http) {
		const service = this;
		const aliens: Record<string, Alien> = {};
		const names: string[] = [];

		service.init = http.get("data/aliens2.json")
			.map(response => (response.json() as Alien.Data).list)
			.toPromise<Alien[]>().then(result => {
				result.forEach(alien => {
					aliens[alien.name] = alien;
					names.push(alien.name);
				});
				names.sort();
				return names.slice(0);
			});

		service.get = name => aliens[name] || {} as Alien;
		service.getMatchingNames = function(levels, games, exclude, setup) {
			// remove wrong game/level
			let filteredNames = names.filter((name: string): boolean => levels[aliens[name].level] && games.indexOf(aliens[name].game) > -1);
			// remove specific names
			if(exclude && exclude.length) { filteredNames = filteredNames.filter((name: string): boolean => exclude.indexOf(name) < 0); }
			// remove if removing game setup (unless only removing extra color)
			if(setup && setup !== "none") { filteredNames = filteredNames.filter((name: string): boolean => (!aliens[name].setup || (setup === "color" && aliens[name].setup !== "color"))); }

			return filteredNames;
		};
	}
}