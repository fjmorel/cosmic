import { Injectable } from "@angular/core";
// tslint:disable-next-line:no-submodule-imports
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

// tslint:disable-next-line:no-submodule-imports
import "rxjs/add/operator/map";

@Injectable()
export class AlienService {/** Promise that returns once data is fetched */
	public init: Observable<string[]>;
	/** Get alien from name */
	public get: (name: string) => Alien;
	/** Get names that match given properties */
	public getMatchingNames: (levels: boolean[], games: GameSelection, exclude?: string[], setup?: SetupLevel) => string[];
	/** Get aliens that match given properties */
	public getMatching: (levels: boolean[], games: GameSelection, exclude?: string[], setup?: SetupLevel) => Alien[];

	constructor(http: HttpClient) {
		const service = this;
		const aliens: Record<string, Alien> = {};
		const names: string[] = [];

		service.init = http.get<Alien.Data>("data/aliens2.json")
			.map(response => {
				response.list.forEach(alien => {
					aliens[alien.name] = alien;
					names.push(alien.name);
				});
				names.sort();
				return names.slice(0);
			});

		service.get = name => aliens[name] || {} as Alien;
		service.getMatchingNames = function(levels, games, exclude, setup) {
			// remove wrong game/level
			let filteredNames = names.filter(name => levels[aliens[name].level] && games[aliens[name].game]);
			// remove specific names
			if(exclude && exclude.length) { filteredNames = filteredNames.filter(name => exclude.indexOf(name) < 0); }
			// remove if removing game setup (unless only removing extra color)
			if(setup) { filteredNames = filteredNames.filter(name => (!aliens[name].setup || (setup === "color" && aliens[name].setup !== "color"))); }

			return filteredNames;
		};

		service.getMatching = function(levels, games, exclude, setup) {
			return service.getMatchingNames(levels, games, exclude, setup).map(service.get);
		};
	}
}