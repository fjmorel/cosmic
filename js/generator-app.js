//TODO: testing
//TODO: use sessionstorage for current state (current, given, pool, etc)
(function() {
  "use strict";
  var app = angular.module('GameGeneratorApp', ['cosmicAliens', 'ngStorage', 'ui.select']);
  app.constant('generatorVersion', 2);

  //app.config(['$compileProvider', function(provider) { provider.debugInfoEnabled(false); }]);

  //Theme for ui-select
  /*
  app.value('selectTheme', 'select/cosmic');
  app.run(["$templateCache", 'selectTheme', function($templateCache, theme) {
    $templateCache.put(theme + "/choices.tpl.html", '<ul class="ui-select-choices ui-select-choices-content dropdown-menu" role="listbox" ng-show="$select.items.length > 0"><li class="ui-select-choices-group"><div class="ui-select-choices-row" role="option"><a href="javascript:void(0)" class="ui-select-choices-row-inner"></a></div></li></ul>');
    $templateCache.put(theme + "/match-multiple.tpl.html", '<div class="ui-select-container ui-select-multiple ui-select-bootstrap dropdown form-control" ng-class="{open: $select.open}"><div><div class="ui-select-match"></div><input type="text" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" class="ui-select-search input-xs" placeholder="{{::$selectMultiple.getPlaceholder()}}" ng-click="$select.activate()" ng-model="$select.search" role="combobox" aria-label="{{ ::$select.baseTitle }}" ondrop="return false;" /></div><div class="ui-select-choices"></div></div>');
    $templateCache.put(theme + "/select-multiple.tpl.html", '<span class="ui-select-match"><span ng-repeat="$item in $select.selected"><span class="ui-select-match-item btn btn-primary btn-xs" tabindex="-1" type="button" ng-click="$selectMultiple.removeChoice($index)"><span class="close ui-select-match-close">&nbsp;&times;</span><span uis-transclude-append=""></span></span></span></span>');
  }]);
  */

  //Based on settings, allow user to pick aliens randomly
  app.controller('GeneratorCtrl', ["$scope", "alienData", '$localStorage', '$sessionStorage', 'generatorVersion', function($scope, Aliens, $localStorage, $sessionStorage, VERSION) {

    var ctrl = this;
    
    var defaults = {
      complexities: [true, true, true],
      games: { E: true },
      namesExcluded: [],
      setupLevel: "none",
      numToChoose: 2,
      preventConflicts: true,
      version: 1
    };
    $localStorage.$default(defaults);
    if(!$localStorage.version || $localStorage.version < VERSION) {
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
    $scope.message = "Loading aliens...";
    $scope.aliensToShow = [];
    $scope.aliensAll = [];

    //Status
    var current = [], given = [], restricted = [], pool = [];
    $scope.namesAll = [];
    $scope.numOut = function() { return current.length + given.length + restricted.length; };
    $scope.numCurrent = function() { return current.length; };
    $scope.numGiven = function() { return given.length; };
    $scope.numRestricted = function() { return restricted.length; };
    $scope.numLeft = function() { return pool.length; };
    $scope.aliens;

    //Determine list of possible choices based on selected options
    var resetGenerator = function() {
      //Create POOL from aliens that match level and game and are not excluded, and clear other lists
      var opts = $scope.settings;
      pool = $scope.namesAll.filter(function(name) {
        var e = Aliens.get(name);
        return opts.complexities[e.level] && opts.games[e.game] && $scope.namesExcluded.indexOf(name) < 0 && ($scope.setupLevel === 'none' || e.setup === undefined || ($scope.setupLevel === 'color' && e.setup !== "color"));
      });
      given = [];
      current = [];
      restricted = [];

      //SETTINGS.resetHowManyToSelect();//Make sure it's within new limit
      ctrl.restrictNumToChoose();
      //Write status
      $scope.message = "List reset.";
      $scope.aliensToShow = [];
    };

    ctrl.onExcludeSelect = function(name) {
      if($scope.namesExcluded.indexOf(name) < 0) $scope.namesExcluded.push(name);
      ctrl.saveSetting('namesExcluded');
    }
    ctrl.onExcludeRemove = function(name) {
      var index = $scope.namesExcluded.indexOf(name);
      if(index > -1) $scope.namesExcluded.splice(index, 1);
      ctrl.saveSetting('namesExcluded');
    }
    ctrl.saveSetting = function(setting) {
      $localStorage[setting] = $scope[setting];
      resetGenerator();
    };

    //Choose alien from pool
    var pickAlien = function() {
      //Select name (return if wasn't able to select
      var choice = Math.floor(Math.random() * pool.length);
      if(!pool[choice]) return;
      var name = pool.splice(choice, 1)[0];
      current.push(name);
      current.sort();

      //If current choice has any restrictions, remove them from pool as well
      var alien = Aliens.get(name);
      if($scope.settings.preventConflicts && alien.restriction) {
        var restrictions = alien.restriction.split(',');
        for(var j = 0; j < restrictions.length; j++) {
          var index = pool.indexOf(restrictions[j]);
          if(index > -1) { restricted.push(pool.splice(index, 1)[0]); }
        }
      }
      //Return select name
      return name;
    };
    //Move current to given and move on
    var makePickFinal = function() {
      given = given.concat(current, restricted).sort();
      restricted = []; current = [];
    };
    //Move current selection back to pool
    var undo = function() {
      pool = pool.concat(current, restricted);
      pool.sort();
      current = []; restricted = [];
    };

    var NOT_RESET = 0;
    ctrl.reset = function() {
      if(confirm("Reset list of aliens?")) resetGenerator();
      else NOT_RESET++;

      if(NOT_RESET > 2) {
        makePickFinal();
        $scope.message = "Aliens given out so far:"
        $scope.aliensToShow = given.map(Aliens.get);
        NOT_RESET = 0;
      }
    };

    //Keep choose # within 1 and max. Run when resetting alien list (# might have changed) and changing # to pick
    ctrl.restrictNumToChoose = function() {
      var numToGive = $scope.numToChoose;
      var max = $scope.numLeft();
      if(max > 0 && numToGive > max) numToGive = max;
      if(numToGive < 1) numToGive = 1;

      $scope.numToChoose = numToGive;
      $localStorage.numToChoose = numToGive;
    };

    ctrl.pickAliens = function() {
      makePickFinal();

      //Pick aliens randomly
      var howManyToChoose = $scope.numToChoose;
      for(var i = 0; i < howManyToChoose; i++) {
        var name = pickAlien();
        if(!name) break;
      }

      //If unable to pick desired number, undo
      if(current.length < howManyToChoose) {
        undo();
        $scope.aliensToShow = [];
        $scope.message = "Not enough potential aliens left." + ($scope.settings.preventConflicts ? " It's possible that the \"Prevent conflicts\" option is preventing me from displaying remaining aliens." : "");
        return;
      }

      //Display
      $scope.message = "Choices:";
      $scope.aliensToShow = current.map(Aliens.get);
      ctrl.restrictNumToChoose();
      return;
    };

    ctrl.hide = function() {
      $scope.aliensToShow = [];
      $scope.message = "Choices hidden.";
    };

    ctrl.show = function() {
      //Ask for initial of one of the aliens before reshowing them
      var initials = current.map(function(e) { return e[0].toLowerCase(); });
      if(initials.indexOf((prompt("Enter the first initial of one of the aliens you were given, then click OK.") || "").toLowerCase()) < 0) {
        $scope.message = "Wrong letter.";
        return;
      }

      //If passed, then show aliens
      $scope.message = "Choices:"
      $scope.aliensToShow = current.map(Aliens.get);
    };

    ctrl.redo = function() {
      if(confirm("Redo?")) {
        undo();
        ctrl.pickAliens();
      }
    };

    //Init generator
    Aliens.onLoaded(function() {
      $scope.namesAll = $scope.namesAll.concat(Aliens.getNames().sort());
      $scope.aliensAll = $scope.namesAll.map(function(e) { return Aliens.get(e); });
      resetGenerator();
    });
  }]);
})();