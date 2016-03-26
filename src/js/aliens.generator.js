(function () {
  "use strict";
  //TODO: testing

  let app = angular.module('cc.aliens.generator', ['ngAria', 'cc.base', 'cc.aliens', 'ngStorage', 'ngMaterial']);
  //app.config(['$compileProvider', function(provider) { provider.debugInfoEnabled(false); }]);
  app.constant('generatorVersion', 2);

  //TODO: use sessionstorage for current state (current, given, pool, etc)
  app.service('GeneratorService', ['alienData', function (Aliens) {
    //Status
    let service = {};
    //Current = currently drawn. Given = previously given/restricted. Restricted = restricted by those currently drawn. Pool = all left to draw from
    let current = [], given = [], restricted = [], pool = [];

    //Determine list of possible choices based on selected options
    service.reset = function (complexities, games, namesExcluded, setupLevel) {
      pool = Aliens.getMatchingNames(complexities, games, namesExcluded, setupLevel);
      given = [];
      current = [];
      restricted = [];

      return { aliens: [], message: "List reset." };
    };

    //Choose alien from pool
    let drawOne = function (preventConflicts) {
      //Select name (return if wasn't able to select
      let choice = Math.floor(Math.random() * pool.length);
      if (!pool[choice]) return;
      let name = pool.splice(choice, 1)[0];
      current.push(name);
      current.sort();

      //If current choice has any restrictions, remove them from pool as well
      let alien = Aliens.get(name);
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
    let makePickFinal = function () {
      given = given.concat(current, restricted);
      restricted = []; current = [];
    };

    //Move current selection back to pool
    let undo = function () {
      pool = pool.concat(current, restricted);
      pool.sort();
      current = []; restricted = [];
    };

    service.getAllGiven = function () {
      makePickFinal();
      return { aliens: given.sort().map(Aliens.get), message: "Aliens given out so far:" };
    };

    //Keep choose # within 1 and max. Run when resetting alien list (# might have changed) and changing # to pick
    service.getChooseLimit = function (original) {
      let numToGive = original;
      let max = pool.length;
      if (max > 0 && numToGive > max) numToGive = max;
      if (numToGive < 1) numToGive = 1;
      return numToGive;
    };

    //Pick aliens randomly
    service.draw = function (howManyToChoose) {
      makePickFinal();
      for (let i = 0; i < howManyToChoose; i++) {
        let name = drawOne();
        if (!name) break;
      }

      //If unable to pick desired number, undo
      if (current.length < howManyToChoose) {
        undo();
        return { aliens: [], message: "Not enough potential aliens left." + (service.settings.preventConflicts ? " It's possible that the \"Prevent conflicts\" option is preventing me from displaying remaining aliens." : "") };
      }

      //Display
      return { aliens: current.map(Aliens.get), message: "Choices:", limit: service.getChooseLimit(howManyToChoose) };
    };


    //Hide all aliens (so return nothing to show
    service.hide = () => ({ aliens: [], state: "Choices hidden." });

    //Show current aliens if pass test
    service.show = function () {
      //Ask for initial of one of the aliens before reshowing them
      let initials = current.map(function (e) { return e[0].toLowerCase(); });
      if (initials.indexOf((prompt("Enter the first initial of one of the aliens you were given, then click OK.") || "").toLowerCase()) < 0) {
        return { aliens: [], state: "Wrong letter." };
      }

      //If passed, then show aliens
      return { aliens: current.map(Aliens.get), message: "Choices:" };
    };

    //Undo last draw, then draw again
    service.redo = function (howManyToChoose) {
      if (confirm("Redo?")) {
        undo();
        return service.draw(howManyToChoose);
      }
    };

    //Get which actions are not allowed
    service.getDisabledActions = function (howManyToChoose, numShown) {
      return {
        draw: (pool.length < howManyToChoose),
        hide: (numShown < 1),
        show: !(current.length > 0 && numShown < 1),
        redo: (current.length <= 0 || numShown <= 0),
        reset: (current.length <= 0 && given.length <= 0)
      };
    };

    //Get number given out and size of pool
    service.getStatus = function () {
      return (current.length + given.length + restricted.length) + " of " + (current.length + given.length + restricted.length + pool.length) + " drawn.";
    };

    //Start Generator by getting alien names
    service.init = Aliens.init;

    return service;
  }]);

  //Based on settings, allow user to pick aliens randomly
  app.controller('GeneratorCtrl', ['$localStorage', 'generatorVersion', 'GeneratorService', function ($localStorage, VERSION, Generator) {

    let ctrl = this;

    let defaults = {
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
    ctrl.disabled = {
      draw: true, hide: true, show: true, redo: true, reset: true
    };

    let setState = function (newState) {
      if (!newState) return;
      ctrl.state = newState.message;
      ctrl.aliensToShow = newState.aliens;
      if (newState.limit) {
        ctrl.settings.numToChoose = newState.limit;
        $localStorage.numToChoose = newState.limit;
      }
      ctrl.status = Generator.getStatus();
      ctrl.disabled = Generator.getDisabledActions(ctrl.settings.numToChoose, ctrl.aliensToShow.length);
    };

    let resetGenerator = function () {
      let opts = ctrl.settings;
      setState(Generator.reset(opts.complexities, opts.games, opts.namesExcluded, opts.setupLevel));
      ctrl.restrictNumToChoose();
    };

    ctrl.saveSetting = function (setting) {
      $localStorage[setting] = ctrl.settings[setting];
      resetGenerator();
    };

    let NOT_RESET = 0;
    ctrl.reset = function () {
      if (confirm("Reset list of aliens?")) resetGenerator();
      else NOT_RESET++;

      if (NOT_RESET > 2) {
        setState(Generator.getAllGiven());
        NOT_RESET = 0;
      }
    };

    //Keep choose # within 1 and max. Run when resetting alien list (# might have changed) and changing # to pick
    ctrl.restrictNumToChoose = function () {
      ctrl.settings.numToChoose = Generator.getChooseLimit(ctrl.settings.numToChoose);
      $localStorage.numToChoose = ctrl.settings.numToChoose;
    };

    ctrl.draw = function () { setState(Generator.draw(ctrl.settings.numToChoose)); };
    ctrl.hide = function () { setState(Generator.hide()); };
    ctrl.show = function () { setState(Generator.show()); };
    ctrl.redo = function () { setState(Generator.redo(ctrl.settings.numToChoose)); };

    //Init generator
    Generator.init().then(function (names) {
      ctrl.namesAll = names;
      resetGenerator();
    });
  }]);

  angular.bootstrap(document, ['cc.aliens.generator'], { 'strictDi': true });
})();