/// <reference path="cosmic.aliens.ts" />

interface GeneratorStatus {
  aliens: Alien[],
  message: string,
  limit?: number
}

interface GeneratorService {
  reset: Function,
  getAllGiven: Function,
  getChooseLimit: Function,
  draw: Function,
  hide: Function,
  show: Function,
  redo: Function,
  init: Function,
  getDisabledActions: Function,
  getStatus: Function
}

interface GeneratorAllowedActions {
  draw: boolean,
  hide: boolean,
  show: boolean,
  redo: boolean,
  reset: boolean
}

interface GeneratorSettings {
  complexities: boolean[],
  games: { E: boolean },
  namesExcluded: string[],
  setupLevel: string,
  numToChoose: number,
  preventConflicts: boolean,
  version: number
}

(function () {
  "use strict";
  //TODO: testing, remove debug info

  angular
    .module('cc.aliens.generator', ['ngAria', 'cc.base', 'cc.aliens', 'ngStorage', 'ngMaterial'])
    //.config(['$compileProvider', function(provider) { provider.debugInfoEnabled(false); }]);
    .constant('generatorVersion', 2)
    .service('GeneratorService', ['alienData', GeneratorServiceProvider])
    .controller('GeneratorCtrl', ['$localStorage', 'generatorVersion', 'GeneratorService', GeneratorController]);

  //TODO: use sessionstorage for current state (current, given, pool, etc)
  function GeneratorServiceProvider(Aliens: AlienService): GeneratorService {
    //Current = currently drawn. Given = previously given/restricted. Restricted = restricted by those currently drawn. Pool = all left to draw from
    let current: string[] = [],
      given: string[] = [],
      restricted: string[] = [],
      pool: string[] = [];

    //Choose alien from pool
    let drawOne = function (preventConflicts: boolean): string {
      //Select name (return if wasn't able to select
      let choice = Math.floor(Math.random() * pool.length);
      if (!pool[choice]) return;
      let name = pool.splice(choice, 1)[0];
      current.push(name);

      //If current choice has any restrictions, remove them from pool as well
      let alien: Alien = Aliens.get(name);
      if (preventConflicts && alien.restriction) {
        let restrictions = alien.restriction.split(',');
        for (let j = 0; j < restrictions.length; j++) {
          let index = pool.indexOf(restrictions[j]);
          if (index > -1) { restricted.push(pool.splice(index, 1)[0]); }
        }
      }
      //Return select name
      return name;
    };

    //Move current to given and move on
    let makePickFinal = function (): void {
      given = given.concat(current, restricted);
      restricted = []; current = [];
    };

    //Move current selection back to pool
    let undo = function (): void {
      pool = pool.concat(current, restricted);
      current = []; restricted = [];
    };

    let getLimit = function (original: number): number {
      let numToGive = original;
      let max = pool.length;
      if (max > 0 && numToGive > max) numToGive = max;
      if (numToGive < 1) numToGive = 1;
      return numToGive;
    }

    let draw = function (howManyToChoose: number, preventConflicts: boolean = false): GeneratorStatus {
      makePickFinal();
      for (let i = 0; i < howManyToChoose; i++) {
        let name = drawOne(preventConflicts);
        if (!name) break;
      }

      //If unable to pick desired number, undo
      if (current.length < howManyToChoose) {
        undo();
        return { aliens: [], message: "Not enough potential aliens left." + (preventConflicts ? " It's possible that the \"Prevent conflicts\" option is preventing me from displaying remaining aliens." : "") };
      }

      //Display
      return { aliens: current.sort().map(Aliens.get), message: "Choices:", limit: getLimit(howManyToChoose) };
    }

    return {

      //Determine list of possible choices based on selected options
      reset: function (complexities: boolean[], games: Map<boolean>, namesExcluded: string[], setupLevel: string): GeneratorStatus {
        pool = Aliens.getMatchingNames(complexities, games, namesExcluded, setupLevel);
        given = [];
        current = [];
        restricted = [];

        return { aliens: [], message: "List reset." };
      },

      //Show all aliens that have been given out so far
      getAllGiven: function (): GeneratorStatus {
        makePickFinal();
        return { aliens: given.sort().map(Aliens.get), message: "Aliens given out so far:" };
      },

      //Keep choose # within 1 and max. Run when resetting alien list (# might have changed) and changing # to pick
      getChooseLimit: getLimit,

      //Pick aliens randomly
      draw: draw,

      //Hide all aliens (so return nothing to show
      hide: (): GeneratorStatus => ({ aliens: [], message: "Choices hidden." }),

      //Show current aliens if pass test
      show: function (): GeneratorStatus {
        //Ask for initial of one of the aliens before reshowing them
        let initials = current.map(function (e) { return e[0].toLowerCase(); });
        if (initials.indexOf((prompt("Enter the first initial of one of the aliens you were given, then click OK.") || "").toLowerCase()) < 0) {
          return { aliens: [], message: "Wrong letter." };
        }

        //If passed, then show aliens
        return { aliens: current.sort().map(Aliens.get), message: "Choices:" };
      },

      //Undo last draw, then draw again
      redo: function (howManyToChoose: number, preventConflicts: boolean = false) {
        if (confirm("Redo?")) {
          undo();
          return draw(howManyToChoose, preventConflicts);
        }
      },

      //Get which actions are not allowed
      getDisabledActions: function (howManyToChoose: number, numShown: number): GeneratorAllowedActions {
        return {
          draw: (pool.length < howManyToChoose),
          hide: (numShown < 1),
          show: !(current.length > 0 && numShown < 1),
          redo: (current.length <= 0 || numShown <= 0),
          reset: (current.length <= 0 && given.length <= 0)
        };
      },

      //Get number given out and size of pool
      getStatus: function () {
        let numGiven = current.length + given.length + restricted.length;
        return numGiven + " of " + (numGiven + pool.length) + " drawn.";
      },

      //Start Generator by getting alien names
      init: Aliens.init

    }
  }

  //Based on settings, allow user to pick aliens randomly
  function GeneratorController($localStorage: IStorageService, VERSION: number, Generator: GeneratorService) {

    let ctrl = this;

    let defaults: GeneratorSettings = {
      complexities: [true, true, true],
      games: { E: true },
      namesExcluded: [],
      setupLevel: "none",
      numToChoose: 2,
      preventConflicts: true,
      version: 2
    };
    $localStorage.$default(defaults);
    if (!$localStorage.version || $localStorage.version < VERSION) {
      $localStorage.$reset(defaults);
      $localStorage.version = VERSION;
    }

    ctrl.settings = $localStorage;

    //Output
    ctrl.status = "0 of 0 drawn."
    ctrl.state = "Loading aliens...";
    ctrl.aliensToShow = [];

    //Button states
    ctrl.disabled = { draw: true, hide: true, show: true, redo: true, reset: true };

    function setState(newState: GeneratorStatus): void {
      if (!newState) return;
      ctrl.state = newState.message;
      ctrl.aliensToShow = newState.aliens;
      if (newState.limit) {
        ctrl.settings.numToChoose = newState.limit;
        $localStorage.numToChoose = newState.limit;
      }
      ctrl.status = Generator.getStatus();
      ctrl.disabled = Generator.getDisabledActions(ctrl.settings.numToChoose, ctrl.aliensToShow.length);
    }

    function resetGenerator(): void {
      let opts = ctrl.settings;
      setState(Generator.reset(opts.complexities, opts.games, opts.namesExcluded, opts.setupLevel));
      ctrl.restrictNumToChoose();
    }

    ctrl.saveSetting = function (setting: string) {
      $localStorage[setting] = ctrl.settings[setting];
      resetGenerator();
    };

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
      $localStorage.numToChoose = ctrl.settings.numToChoose;
    };

    ctrl.draw = function (): void { setState(Generator.draw(ctrl.settings.numToChoose, ctrl.settings.preventConflicts)); };
    ctrl.hide = function (): void { setState(Generator.hide()); };
    ctrl.show = function (): void { setState(Generator.show()); };
    ctrl.redo = function (): void { setState(Generator.redo(ctrl.settings.numToChoose, ctrl.settings.preventConflicts)); };

    //Init generator
    Generator.init().then(function (names: string[]): void {
      ctrl.namesAll = names;
    }).then(resetGenerator);
  }
})();