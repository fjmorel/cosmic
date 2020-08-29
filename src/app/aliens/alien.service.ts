import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, retry, shareReplay } from 'rxjs/operators';
import { Alien, GameSelection, SetupLevel, SetupType } from '../types';

@Injectable({ providedIn: 'root' })
export class AlienService {
  /** Promise that returns once data is fetched */
  public init$: Observable<string[]>;
  /** Get alien from name */
  public get: (name: string) => Alien;
  /** Get names that match given properties */
  public getMatchingNames: (levels: boolean[], games: GameSelection, exclude?: string[], setup?: SetupLevel) => string[];

  constructor(http: HttpClient) {
    const aliens: Record<string, Alien> = {};
    const names: string[] = [];

    this.init$ = http.get<Alien.Data>('data/aliens2.json').pipe(
      retry(3),
      map(response => {
        response.list.forEach(alien => {
          aliens[alien.name] = alien;
          names.push(alien.name);
        });
        names.sort();
        return names.slice(0);
      }),
      shareReplay(),
    );

    this.get = name => aliens[name];
    this.getMatchingNames = (levels, games, exclude, setup) => {
      return names.filter(name => {
        const alien = aliens[name];
        // Matches level and game
        return levels[alien.level] && games[alien.game] &&
          // No exclude by name, or not in exclude list
          (!exclude || !exclude.length || exclude.indexOf(name) < 0) &&
          // No setup restriction or no alien setup or (only restrict color and alien setup is not color)
          (!setup || !alien.setup || (setup === SetupLevel.RequiresExtraColor && alien.setup !== SetupType.RequiresExtraColor));
      });
    };
  }
}
