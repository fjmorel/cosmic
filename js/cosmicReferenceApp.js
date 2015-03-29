//TODO: testing, good multiselect w/o jQuery
//TODO: use sessionstorage for current state (current, given, pool, etc)
(function() {
  "use strict";
  var app = angular.module('cosmicApp', ['cosmicAliens', 'ngStorage']);

  //Based on settings, allow user to pick aliens randomly
  app.controller('GeneratorCtrl', ["$scope", "alienData", '$localStorage', '$sessionStorage', function($scope, Aliens, $localStorage, $sessionStorage) {
    $localStorage.$default({
      complexities: [true, true, true],
      games: { E: true },
      orderBy: ['name', 'game', 'level'],
      groupBy: []
    });

    //Include
    $scope.complexities = $localStorage.complexities;
    $scope.games = $localStorage.games;
    $scope.orderBy = $localStorage.orderBy;
    $scope.groupBy = $localStorage.groupBy;
    $scope.aliensToShow = [];
    var namesAll = [];
    
    //Determine list of possible choices based on selected options
    function showAliens() {
      //Create POOL from aliens that match level and game and are not excluded, and clear other lists
      $scope.aliensToShow = namesAll.filter(function(name) {
        var e = Aliens.get(name);
        return $scope.complexities[e.level] && $scope.games[e.game];
      }).map(function(e) { return Aliens.get(e); });
    }

    $scope.onSettingChange = function(setting) {
      $localStorage[setting] = $scope[setting];
      showAliens();
    };

    //Init generator
    Aliens.onLoaded(function() {
      namesAll = Aliens.getNames();
      showAliens();
    });
  }]);
})();