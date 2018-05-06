
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AlienService {
  /** Promise that returns once data is fetched */
  public init: Promise<string[]>;
  /** Get alien from name */
  public get: (name: string) => Alien;
  /** Get names that match given properties */
  public getMatchingNames: (levels: boolean[], games: GameSelection, exclude?: string[], setup?: SetupLevel) => string[];
  /** Get aliens that match given properties */
  public getMatching: (levels: boolean[], games: GameSelection, exclude?: string[], setup?: SetupLevel) => Alien[];

  constructor(http: HttpClient) {
    const aliens: Record<string, Alien> = {};
    const names: string[] = [];

    // Convert to Promise so that .subscribe will not run this request again. Could be done with Rx.Subject or multicast?
    this.init = http.get<Alien.Data>('data/aliens2.json').toPromise().then(response => {
      response.list.forEach(alien => {
        aliens[alien.name] = alien;
        names.push(alien.name);
      });
      names.sort();
      return names.slice(0);
    });

    this.get = name => aliens[name];
    this.getMatchingNames = (levels, games, exclude, setup) => {
      // remove wrong game/level
      let filteredNames = names.filter(name => levels[aliens[name].level] && games[aliens[name].game]);
      // remove specific names
      if(exclude && exclude.length) { filteredNames = filteredNames.filter(name => exclude.indexOf(name) < 0); }
      // remove if removing game setup (unless only removing extra color)
      if(setup) { filteredNames = filteredNames.filter(name => (!aliens[name].setup || (setup === 'color' && aliens[name].setup !== 'color'))); }

      return filteredNames;
    };

    this.getMatching = (levels, games, exclude, setup) => {
      return this.getMatchingNames(levels, games, exclude, setup).map(this.get);
    };
  }
}
