import { Component, Inject, OnInit } from '@angular/core';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { AlienService } from '../../aliens/alien.service';
import { Alien, GameSelection, Game } from '../../types';
import { groupItems, IGroupedItems } from '../../groupItems';

const STORAGE_PREFIX = 'cosmic.alien-ref';

// todo: options for grouping/ordering

@Component({
  selector: 'alien-reference',
  templateUrl: './page.component.html',
})
export class AlienReferencePageComponent implements OnInit {
  public groups: IGroupedItems<Alien>[];
  public games: GameSelection;
  public levels: boolean[];
  // orderBy: Alien.MandatoryProperties;
  // groupBy: Alien.MandatoryProperties;

  public constructor(private Aliens: AlienService, @Inject(LOCAL_STORAGE) private Storage: StorageService) { }

  public ngOnInit() {
    // Set defaults
    this.levels = this.Storage.get(STORAGE_PREFIX + 'levels') || [true, true, true];
    this.games = this.Storage.get(STORAGE_PREFIX + 'games') || { [Game.Encounter]: true };
    this.Aliens.init$.subscribe(() => { this.refresh(); });
  }

  /** Handle game option change */
  public onSelectGame(newGames: GameSelection) {
    this.Storage.set(STORAGE_PREFIX + 'games', newGames);
    this.games = newGames;
    this.refresh();
  }

  /** Handle level option change */
  public onSelectLevel(newLevels: boolean[]) {
    this.Storage.set(STORAGE_PREFIX + 'levels', newLevels);
    this.levels = newLevels;
    this.refresh();
  }

  /** Refresh shown aliens based on settings */
  private refresh() {
    this.groups = groupItems(this.Aliens.getMatchingNames(this.levels, this.games).map((value) => this.Aliens.get(value, this.games)), ['game', 'level'], ['name']);
  }
}
