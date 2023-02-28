import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, retry, shareReplay } from 'rxjs/operators';
import { Alien, AlienDescriptor, Game, GameSelection, SetupLevel, SetupType } from '../types';

@Injectable({ providedIn: 'root' })
export class AlienService {
  /** Promise that returns once data is fetched */
  public init$: Observable<string[]>;
  /** Get alien from name */
  public get: (name: string, games?: GameSelection) => Alien;
  /** Get names that match given properties */
  public getMatchingNames: (levels: boolean[], games: GameSelection, exclude?: string[], setup?: SetupLevel) => string[];

  normalizeAlien: (alien: AlienDescriptor, games: GameSelection) => Alien;

  public constructor(http: HttpClient) {
    const aliens: Record<string, AlienDescriptor> = {};
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

    this.get = (name: string, games?: GameSelection) => {
      return this.normalizeAlien(aliens[name], games || {});
    };

    this.getMatchingNames = (levels, games, exclude, setup) => names.filter(name => {
      // Normalize the alien based on the game selection
      const alien = this.normalizeAlien(aliens[name], games);
      // Matches level and game
      return levels[alien.level] && (games[alien.game] || (games[Game.OdysseyAlternate] && alien.alternate)) &&
        // No exclude by name, or not in exclude list
        (!exclude || !exclude.length || exclude.indexOf(name) < 0) &&
        // No setup restriction or no alien setup or (only restrict color and alien setup is not color)
        (!setup || !alien.setup || (setup === SetupLevel.RequiresExtraColor && alien.setup !== SetupType.RequiresExtraColor));
    });

    this.normalizeAlien = (alien, games) => {
      // Normalize the alien based on the game selection
      const { powers, ...rest } = alien;
      let normalized: Alien;
      if(games[Game.OdysseyAlternate] && powers.length > 1) {
        normalized = {
          ...rest,
          ...powers[1],
          alternate: true,
        };
      } else {
        normalized = {
          ...rest,
          ...powers[0],
        };
      }

      return normalized;
    };
  }
}
