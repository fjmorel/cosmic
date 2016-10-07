import { IAllowedActions, IStatus, Service } from "./service";

interface IStorage extends ng.storage.IStorageService {
  complexities: boolean[];
  games: IMap<boolean>;
  namesExcluded: string[];
  setupLevel: string;
  numToChoose: number;
  preventConflicts: boolean;
}

/**
 * Based on settings, allow user to pick aliens randomly
 */
export class Controller {
  settings: IStorage;
  namesAll: string[];

  // output
  status = "0 of 0 drawn. 0 redos.";
  state = "Loading aliens...";
  aliensToShow: Alien[] = [];
  disabled: IAllowedActions = { draw: true, hide: true, show: true, redo: true, reset: true };

  // actions
  draw: () => void;
  hide: () => void;
  show: () => void;
  redo: () => void;
  reset: () => void;
  restrictNumToChoose: () => void;
  change: () => void;

  constructor($localStorage: IStorage, Aliens: IAlienService) {
    let ctrl = this;
    let Generator = new Service(Aliens);

    $localStorage.$default({
      complexities: [true, true, true],
      games: { E: true },
      namesExcluded: [],
      setupLevel: "none",
      numToChoose: 2,
      preventConflicts: true
    });
    ctrl.settings = $localStorage;

    function setState(newState: IStatus): void {
      if (!newState) return;
      ctrl.state = newState.message;
      ctrl.aliensToShow = newState.aliens;
      if (newState.limit) {
        ctrl.settings.numToChoose = newState.limit;
      }
      ctrl.status = Generator.getStatus();
      ctrl.disabled = Generator.getDisabledActions(ctrl.settings.numToChoose, ctrl.aliensToShow.length);
    }

    function resetGenerator(): void {
      let opts = ctrl.settings;
      setState(Generator.reset(opts.complexities, opts.games, opts.namesExcluded, opts.setupLevel));
      ctrl.restrictNumToChoose();
    }

    ctrl.change = resetGenerator;

    let NOT_RESET = 0;
    ctrl.reset = function (): void {
      if (confirm("Reset list of aliens?")) resetGenerator();
      else NOT_RESET++;

      if (NOT_RESET > 2) {
        setState(Generator.getAllGiven());
        NOT_RESET = 0;
      }
    };

    // keep choose # within 1 and max. Run when resetting alien list (# might have changed) and changing # to pick
    ctrl.restrictNumToChoose = function (): void {
      ctrl.settings.numToChoose = Generator.getChooseLimit(ctrl.settings.numToChoose);
    };

    ctrl.draw = () => setState(Generator.draw(ctrl.settings.numToChoose, ctrl.settings.preventConflicts));
    ctrl.hide = () => setState(Generator.hide());
    ctrl.show = () => setState(Generator.show());
    ctrl.redo = () => setState(Generator.redo(ctrl.settings.numToChoose, ctrl.settings.preventConflicts));

    // init generator
    Generator.init.then(function (names: string[]): void {
      ctrl.namesAll = names;
    }).then(resetGenerator);
  }
}
