//TODO: testing
//TODO: use sessionstorage for current state (current, given, pool, etc)
(function() {
  "use strict";
  var app = angular.module('cosmicApp', ['cosmicAliens', 'ngStorage', 'ui.select']);
  
  //Based on settings, allow user to pick aliens randomly
  app.controller('GeneratorCtrl', ["$scope", "alienData", '$localStorage', '$sessionStorage', function($scope, Aliens, $localStorage, $sessionStorage) {
    $localStorage.$default({
      complexities: [true, true, true],
      games: { E: true },
      namesExcluded: [],
      setupLevel: "0",
      numToChoose: 2,
      preventConflicts: true
    });

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


    //Status
    var current = [], given = [], restricted = [], pool = [];
    $scope.namesAll = [];
    $scope.numCurrent = function() { return current.length; };
    $scope.numGiven = function() { return given.length; };
    $scope.numRestricted = function() { return restricted.length; };
    $scope.numLeft = function() { return pool.length; };

    //Keep choose # within 1 and max. Run when resetting alien list (# might have changed) and changing # to pick
    $scope.restrictNumToChoose = function() {
      var numToGive = $scope.numToChoose;
      var max = $scope.numLeft();
      if(max > 0 && numToGive > max) numToGive = max;
      if(numToGive < 1) numToGive = 1;

      $scope.numToChoose = numToGive;
      $localStorage.numToChoose = numToGive;
    };

    //Determine list of possible choices based on selected options
    function resetGenerator() {
      //Create POOL from aliens that match level and game and are not excluded, and clear other lists
      var opts = $scope.settings;
      pool = $scope.namesAll.filter(function(name) {
        var e = Aliens.get(name);
        return opts.complexities[e.level] && opts.games[e.game] && $scope.namesExcluded.indexOf(name) < 0 && ($scope.setupLevel === "0" || e.setup === undefined || ($scope.setupLevel === "1" && e.setup !== "color"));
      });
      given = [];
      current = [];
      restricted = [];

      //SETTINGS.resetHowManyToSelect();//Make sure it's within new limit
      $scope.restrictNumToChoose();
      //Write status
      $scope.message = "List reset.";
      $scope.aliensToShow = [];
    }

    $scope.onExcludeSelect = function($item, $model) {
      $scope.namesExcluded.push($item.name);
      $scope.onSettingChange('namesExcluded');
    }
    $scope.onExcludeRemove = function($item, $model) {
      var index = $scope.namesExcluded.indexOf($item.name);
      if(index > -1) $scope.namesExcluded.splice(index, 1);
      $scope.onSettingChange('namesExcluded');
    }
    $scope.onSettingChange = function(setting) {
      $localStorage[setting] = $scope[setting];
      resetGenerator();
    };

    var NOT_RESET = 0;
    $scope.reset = function() {
      if(confirm("Reset list of aliens?")) resetGenerator();
      else NOT_RESET++;

      if(NOT_RESET > 2) {
        makePickFinal();
        $scope.message = "Aliens given out so far:"
        $scope.aliensToShow = given.map(Aliens.get);
        NOT_RESET = 0;
      }
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

    $scope.pickAliens = function() {
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
      $scope.restrictNumToChoose();
      return;
    };

    $scope.hide = function() {
      $scope.aliensToShow = [];
      $scope.message = "Choices hidden.";
    };

    $scope.show = function() {
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

    $scope.redo = function() {
      if(confirm("Redo?")) {
        undo();
        $scope.pickAliens();
      }
    };

    //Init generator
    Aliens.onLoaded(function() {
      $scope.namesAll = Aliens.getNames().sort();
      $scope.aliensAll = $scope.namesAll.map(function(e) { return Aliens.get(e); });
      resetGenerator();
    });
  }]);
})();