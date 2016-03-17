(function () {
  "use strict";
  let app = angular.module('cc.aliens.generator', ['ngAria', 'cc.base', 'cc.aliens', 'ngStorage', 'ngMaterial', 'ngMdIcons']);
  app.constant('generatorVersion', 2);

  //TODO: testing
  //TODO: use sessionstorage for current state (current, given, pool, etc)
  //app.config(['$compileProvider', function(provider) { provider.debugInfoEnabled(false); }]);

  app.controller('NavDrawer', ['$scope', '$mdSidenav', function ($scope, $mdSidenav) {
    $scope.close = function () { $mdSidenav('left').close(); };
    $scope.open = function () { $mdSidenav('left').open(); };
  }]);

  //Based on settings, allow user to pick aliens randomly
  app.controller('GeneratorCtrl', ["$scope", "alienData", '$localStorage', '$sessionStorage', 'generatorVersion', function ($scope, Aliens, $localStorage, $sessionStorage, VERSION) {

    let ctrl = this;

    let defaults = {
      complexities: [true, true, true],
      games: { E: true },
      namesExcluded: [],
      setupLevel: "none",
      numToChoose: 2,
      preventConflicts: true,
      version: 1
    };
    $localStorage.$default(defaults);
    if (!$localStorage.version || $localStorage.version < VERSION) {
      $localStorage.$reset(defaults);
      $localStorage.version = VERSION;
    }

    $scope.settings = $localStorage;
    $scope.complexities = $localStorage.complexities;

    //Exclude
    $scope.namesExcluded = $localStorage.namesExcluded;
    $scope.setupLevel = $localStorage.setupLevel;

    //Choose
    $scope.numToChoose = $localStorage.numToChoose;

    //Output
    ctrl.state = "Loading aliens...";
    $scope.aliensToShow = [];
    $scope.aliensAll = [];

    //Status
    let current = [], given = [], restricted = [], pool = [];

    $scope.namesAll = [];
    ctrl.numOut = () => current.length + given.length + restricted.length;
    ctrl.numCurrent = () =>  current.length;
    ctrl.numGiven = () =>  given.length;
    ctrl.numLeft = () =>  pool.length;
    //$scope.aliens;

    //Determine list of possible choices based on selected options
    let resetGenerator = function () {
      //Create POOL from aliens that match level and game and are not excluded, and clear other lists
      let opts = $scope.settings;
      pool = $scope.namesAll.filter(function (name) {
        let e = Aliens.get(name);
        return opts.complexities[e.level] && opts.games[e.game] && $scope.namesExcluded.indexOf(name) < 0 && ($scope.setupLevel === 'none' || e.setup === undefined || ($scope.setupLevel === 'color' && e.setup !== "color"));
      });
      given = [];
      current = [];
      restricted = [];

      //SETTINGS.resetHowManyToSelect();//Make sure it's within new limit
      ctrl.restrictNumToChoose();
      //Write status
      ctrl.state = "List reset.";
      $scope.aliensToShow = [];
    };

    ctrl.onExcludeChange = function () {
      $scope.namesExcluded = $scope.excluded.map(function (e) { return e.name; });
      ctrl.saveSetting('namesExcluded');
    };
    ctrl.saveSetting = function (setting) {
      $localStorage[setting] = $scope[setting];
      resetGenerator();
    };

    //Choose alien from pool
    let pickAlien = function () {
      //Select name (return if wasn't able to select
      let choice = Math.floor(Math.random() * pool.length);
      if (!pool[choice]) return;
      let name = pool.splice(choice, 1)[0];
      current.push(name);
      current.sort();

      //If current choice has any restrictions, remove them from pool as well
      let alien = Aliens.get(name);
      if ($scope.settings.preventConflicts && alien.restriction) {
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
      given = given.concat(current, restricted).sort();
      restricted = []; current = [];
    };
    //Move current selection back to pool
    let undo = function () {
      pool = pool.concat(current, restricted);
      pool.sort();
      current = []; restricted = [];
    };

    let NOT_RESET = 0;
    ctrl.reset = function () {
      if (confirm("Reset list of aliens?")) resetGenerator();
      else NOT_RESET++;

      if (NOT_RESET > 2) {
        makePickFinal();
        ctrl.state = "Aliens given out so far:";
        $scope.aliensToShow = given.map(Aliens.get);
        NOT_RESET = 0;
      }
    };

    //Keep choose # within 1 and max. Run when resetting alien list (# might have changed) and changing # to pick
    ctrl.restrictNumToChoose = function () {
      let numToGive = $scope.settings.numToChoose;
      let max = ctrl.numLeft();
      if (max > 0 && numToGive > max) numToGive = max;
      if (numToGive < 1) numToGive = 1;

      $scope.settings.numToChoose = numToGive;
      $localStorage.numToChoose = numToGive;
    };

    ctrl.pickAliens = function () {
      makePickFinal();

      //Pick aliens randomly
      let howManyToChoose = $scope.settings.numToChoose;
      for (let i = 0; i < howManyToChoose; i++) {
        let name = pickAlien();
        if (!name) break;
      }

      //If unable to pick desired number, undo
      if (current.length < howManyToChoose) {
        undo();
        $scope.aliensToShow = [];
        ctrl.state = "Not enough potential aliens left." + ($scope.settings.preventConflicts ? " It's possible that the \"Prevent conflicts\" option is preventing me from displaying remaining aliens." : "");
        return;
      }

      //Display
      ctrl.state = "Choices:";
      $scope.aliensToShow = current.map(Aliens.get);
      ctrl.restrictNumToChoose();
      return;
    };

    ctrl.hide = function () {
      $scope.aliensToShow = [];
      ctrl.state = "Choices hidden.";
    };

    ctrl.show = function () {
      //Ask for initial of one of the aliens before reshowing them
      let initials = current.map(function (e) { return e[0].toLowerCase(); });
      if (initials.indexOf((prompt("Enter the first initial of one of the aliens you were given, then click OK.") || "").toLowerCase()) < 0) {
        ctrl.state = "Wrong letter.";
        return;
      }

      //If passed, then show aliens
      ctrl.state = "Choices:";
      $scope.aliensToShow = current.map(Aliens.get);
    };

    ctrl.redo = function () {
      if (confirm("Redo?")) {
        undo();
        ctrl.pickAliens();
      }
    };

    //Init generator
    Aliens.init().then(function (names) {
      $scope.namesAll = $scope.namesAll.concat(names);
      $scope.aliensAll = $scope.namesAll.map(Aliens.get);
      $scope.excluded = $scope.aliensAll.filter(function (e) { return $scope.namesExcluded.indexOf(e.name) > -1; });
      resetGenerator();
    }).catch(function (error) {
      //TODO: something about being unable to load aliens
    });
  }]);
	
	//angular.bootstrap(document, ['cc.aliens.generator'], { 'strictDi' : true });
})();