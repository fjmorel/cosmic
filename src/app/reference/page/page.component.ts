import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';
import { AlienService } from '../../aliens/alien.service';

// todo: options for grouping/ordering
const STORAGE_PREFIX = 'alien-ref';

@Component({
  selector: 'alien-reference',
  styles: [
    '#container { display: flex; flex: auto; flex-wrap: wrap; align-content: stretch; }',
    '.mat-h2 { margin: 16px 8px 8px;}',
  ],
  templateUrl: './page.component.html',
})
export class AlienReferencePageComponent implements OnInit, Reference.Settings {
  public groups: Array<GroupedItems<Alien>>;
  public games: GameSelection;
  public levels: boolean[];

  constructor(private Aliens: AlienService, private Storage: LocalStorageService) { }

  public ngOnInit() {
    // Set defaults
    this.levels = this.Storage.get(STORAGE_PREFIX + 'levels') || [true, true, true];
    this.games = this.Storage.get(STORAGE_PREFIX + 'games') || { Encounter: true };
    this.Aliens.init.subscribe(() => { this.refresh(); });
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
    this.groups = groupItems(this.Aliens.getMatching(this.levels, this.games), ['game', 'level'], ['name']);
  }
}

/** Group objects by given array of fields */
function groupItems(list: Alien[], gFields: Alien.Properties, sFields: Alien.Properties, level: number = 0): Array<GroupedItems<Alien>> {
  if(gFields.length < 1) { return [{ value: '', items: list }]; }

  // group objects by property
  const grouped: Record<string, Alien[]> = {};
  const field = gFields[level];
  list.forEach((item) => {
    // tslint:disable-next-line:no-non-null-assertion
    const group = item[field]!;
    grouped[group] = grouped[group] || [];
    grouped[group].push(item);
  });

  // generate array with named groups
  // todo sort using orderBy
  let result: Array<GroupedItems<Alien>> = Object.keys(grouped).sort().map(group => ({ value: group, items: grouped[group] }));

  // if more fields to group by, go deeper
  if(gFields[level + 1]) {
    result = result.map(group => ({ value: group.value, items: groupItems(group.items as Alien[], gFields, sFields, level + 1) }));
  }

  return result;
}
