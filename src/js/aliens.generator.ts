/// <reference path="../../typings/project.d.ts" />
(function () {
  "use strict";
  //TODO: testing
  //TODO: use sessionstorage for current state (current, given, pool, etc)

  interface Settings {
    complexities: boolean[],
    games: Map<boolean>,
    namesExcluded: string[],
    setupLevel: string,
    numToChoose: number,
    preventConflicts: boolean
  }

  interface Storage extends Settings, ng.storage.IStorageService { }

  interface Status {
    aliens: Alien[],
    message: string,
    limit?: number
  }

  interface AllowedActions {
    draw: boolean,
    hide: boolean,
    show: boolean,
    redo: boolean,
    reset: boolean
  }

  /**
   * Manage aliens given, available, etc
   */
  class GeneratorService {
    private Aliens: AlienService;
    private namesToAliens(names: string[]): Alien[] {
      return names.sort().map(<(name: string) => Alien>this.Aliens.get.bind(this.Aliens));
    }

    //Current = currently drawn. Given = previously given/restricted. Restricted = restricted by those currently drawn. Pool = all left to draw from
    private current: string[] = [];
    private given: string[] = [];
    private restricted: string[] = [];
    private pool: string[] = [];

    //Choose alien from pool
    private drawOne(preventConflicts: boolean): string {
      let service = this;
      //Select name (return if wasn't able to select
      let choice = Math.floor(Math.random() * service.pool.length);
      if (!service.pool[choice]) return;
      let name = service.pool.splice(choice, 1)[0];
      service.current.push(name);

      //If current choice has any restrictions, remove them from pool as well
      let alien: Alien = service.Aliens.get(name);
      if (preventConflicts && alien.restriction) {
        let restrictions = alien.restriction.split(',');
        for (let j = 0; j < restrictions.length; j++) {
          let index = service.pool.indexOf(restrictions[j]);
          if (index > -1) { service.restricted.push(service.pool.splice(index, 1)[0]); }
        }
      }
      //Return select name
      return name;
    }

    //Move current to given and move on
    private makePickFinal(): void {
      let service = this;
      service.given = service.given.concat(service.current, service.restricted);
      service.restricted = []; service.current = [];
    };

    //Move current selection back to pool
    private undo(): void {
      let service = this;
      service.pool = service.pool.concat(service.current, service.restricted);
      service.current = []; service.restricted = [];
    };

    //Determine list of possible choices based on selected options
    reset(complexities: boolean[], games: Map<boolean>, namesExcluded: string[], setupLevel: string): Status {
      let service = this;
      service.pool = service.Aliens.getMatchingNames(complexities, games, namesExcluded, setupLevel);
      service.given = [];
      service.current = [];
      service.restricted = [];
      return { aliens: [], message: "List reset." };
    }

    //Show all aliens that have been given out so far
    getAllGiven(): Status {
      let service = this;
      service.makePickFinal();
      return { aliens: service.namesToAliens(service.given), message: "Aliens given out so far:" };
    };

    //Keep choose # within 1 and max. Run when resetting alien list (# might have changed) and changing # to pick
    getChooseLimit(original: number): number {
      let numToGive = original;
      let max = this.pool.length;
      if (max > 0 && numToGive > max) numToGive = max;
      if (numToGive < 1) numToGive = 1;
      return numToGive;
    };

    //Pick aliens randomly
    draw(howManyToChoose: number, preventConflicts?: boolean): Status {
      let service = this;
      service.makePickFinal();
      for (let i = 0; i < howManyToChoose; i++) {
        let name = service.drawOne(preventConflicts);
        if (!name) break;
      }

      //If unable to pick desired number, undo
      if (service.current.length < howManyToChoose) {
        service.undo();
        return { aliens: [], message: "Not enough potential aliens left." + (preventConflicts ? " It's possible that the \"Prevent conflicts\" option is preventing me from displaying remaining aliens." : "") };
      }

      //Display
      return { aliens: service.namesToAliens(service.current), message: "Choices:", limit: service.getChooseLimit(howManyToChoose) };
    };

    //Hide all aliens (so return nothing to show
    hide(): Status { return { aliens: [], message: "Choices hidden." } };

    //Show current aliens if pass test
    show(): Status {
      let service = this;
      //Ask for initial of one of the aliens before reshowing them
      let initials = service.current.map(function (e) { return e[0].toLowerCase(); });
      if (initials.indexOf((prompt("Enter the first initial of one of the aliens you were given, then click OK.") || "").toLowerCase()) < 0) {
        return { aliens: [], message: "Wrong letter." };
      }

      //If passed, then show aliens
      return { aliens: service.namesToAliens(service.current), message: "Choices:" };
    };

    //Undo last draw, then draw again
    redo(howManyToChoose: number, preventConflicts?: boolean): Status {
      let service = this;
      if (confirm("Redo?")) {
        service.undo();
        return service.draw(howManyToChoose, preventConflicts);
      }
      return { aliens: service.namesToAliens(service.current), message: "Choices:" }
    };

    //Get which actions are not allowed
    getDisabledActions(howManyToChoose: number, numShown: number): AllowedActions {
      let service = this;
      return {
        draw: (service.pool.length < howManyToChoose),
        hide: (numShown < 1),
        show: !(service.current.length > 0 && numShown < 1),
        redo: (service.current.length <= 0 || numShown <= 0),
        reset: (service.current.length <= 0 && service.given.length <= 0)
      };
    };

    //Get number given out and size of pool
    getStatus(): string {
      let service = this;
      let numGiven = service.current.length + service.given.length + service.restricted.length;
      return numGiven + " of " + (numGiven + service.pool.length) + " drawn.";
    };

    //Start Generator by getting alien names
    init: ng.IPromise<string[]>;

    constructor(Aliens: AlienService) {
      this.init = Aliens.init;
      this.Aliens = Aliens;
    }
  }

  /**
   * Based on settings, allow user to pick aliens randomly
   */
  class GeneratorController {
    settings: Storage;
    namesAll: string[];

    //Output
    status = "0 of 0 drawn.";
    state = "Loading aliens...";
    aliensToShow: Alien[] = [];
    disabled = { draw: true, hide: true, show: true, redo: true, reset: true };

    //Actions
    draw(): void { };
    hide(): void { };
    show(): void { };
    redo(): void { };
    reset(): void { };
    restrictNumToChoose(): void { };
    changeSetting(): void { };

    constructor($localStorage: Storage, Generator: GeneratorService) {
      let ctrl = this;

      $localStorage.$default({
        complexities: [true, true, true],
        games: { E: true },
        namesExcluded: [],
        setupLevel: "none",
        numToChoose: 2,
        preventConflicts: true
      });
      ctrl.settings = $localStorage;

      function setState(newState: Status): void {
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

      ctrl.changeSetting = resetGenerator;

      let NOT_RESET = 0;
      ctrl.reset = function (): void {
        if (confirm("Reset list of aliens?")) resetGenerator();
        else NOT_RESET++;

        if (NOT_RESET > 2) {
          setState(Generator.getAllGiven());
          NOT_RESET = 0;
        }
      };

      //Keep choose # within 1 and max. Run when resetting alien list (# might have changed) and changing # to pick
      ctrl.restrictNumToChoose = function (): void {
        ctrl.settings.numToChoose = Generator.getChooseLimit(ctrl.settings.numToChoose);
      };

      ctrl.draw = () => setState(Generator.draw(ctrl.settings.numToChoose, ctrl.settings.preventConflicts));
      ctrl.hide = () => setState(Generator.hide());
      ctrl.show = () => setState(Generator.show());
      ctrl.redo = () => setState(Generator.redo(ctrl.settings.numToChoose, ctrl.settings.preventConflicts));

      //Init generator
      Generator.init.then(function (names: string[]): void {
        ctrl.namesAll = names;
      }).then(resetGenerator);
    }
  }

  angular
    .module('cc.aliens.generator', ['cc.base', 'cc.aliens', 'ngStorage', 'ngAria', 'ngMaterial'])
    .config(['$compileProvider', '$localStorageProvider', function (compiler: ng.ICompileProvider, storage: ng.storage.IStorageProvider) {
      compiler.debugInfoEnabled(false);
      storage.setKeyPrefix("alien-gen-");
    }])
    .service('AlienGeneratorService', ['alienData', GeneratorService])
    .controller('AlienGenerator', ['$localStorage', 'AlienGeneratorService', GeneratorController]);

})();