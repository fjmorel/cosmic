import { groupBy } from '../filters';

interface IStorage extends ng.storage.IStorageService {
		complexities: boolean[];
		games: IMap<boolean>;
		orderPref: string[];
		groupPref: string[];
}

/**
 * Based on settings, show aliens sorted and grouped
 */
export class Controller {
  complexities: boolean[];
  games: IMap<boolean>;
  orderPref: string[];
  groupPref: string[];
  alienGroups: GroupedItems[];
  change: () => void;

  constructor($localStorage: IStorage, Aliens: IAlienService) {
    let ctrl = this;

    // set up default settings
    $localStorage.$default({
      complexities: [true, true, true],
      games: <IMap<boolean>>{ E: true },
      orderPref: ["name"],
      groupPref: ["game", "level"]
    });

    // load settings
    ctrl.complexities = $localStorage.complexities;
    ctrl.games = $localStorage.games;
    ctrl.orderPref = $localStorage.orderPref;
    ctrl.groupPref = $localStorage.groupPref;
    ctrl.alienGroups = [];

    // show filtered, grouped list of aliens
    ctrl.change = function (): void {
      ctrl.alienGroups = groupBy(Aliens.getMatchingNames(ctrl.complexities, ctrl.games).map(Aliens.get), ctrl.groupPref);
    };

    // initialize reference page
    Aliens.init.then(ctrl.change);
  }
}