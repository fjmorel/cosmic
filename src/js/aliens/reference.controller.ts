/// <reference path="../../../typings/project.d.ts" />
interface Storage extends ng.storage.IStorageService {
		complexities: boolean[],
		games: Map<boolean>,
		orderPref: string[],
		groupPref: string[]
}

/**
 * Based on settings, show aliens sorted and grouped
 */
export class Controller {
  complexities: boolean[];
  games: Map<boolean>;
  orderPref: string[];
  groupPref: string[];
  alienGroups: GroupedItems[];
  change(): void { };

  constructor(Aliens: IAlienService, $localStorage: Storage, groupBy: GroupByFilter) {
    let ctrl = this;

    //Set up default settings
    $localStorage.$default({
      complexities: [true, true, true],
      games: <Map<boolean>>{ E: true },
      orderPref: ['name'],
      groupPref: ['game', 'level']
    });

    //Load settings
    ctrl.complexities = $localStorage.complexities;
    ctrl.games = $localStorage.games;
    ctrl.orderPref = $localStorage.orderPref;
    ctrl.groupPref = $localStorage.groupPref;
    ctrl.alienGroups = [];

    //Show filtered, grouped list of aliens
    ctrl.change = function (): void {
      ctrl.alienGroups = groupBy(Aliens.getMatchingNames(ctrl.complexities, ctrl.games).map(Aliens.get), ctrl.groupPref);
    }

    //Initialize reference page
    Aliens.init.then(ctrl.change);
  }
}