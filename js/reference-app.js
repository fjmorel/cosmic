//TODO: testing
(function() {
  "use strict";

  var app = angular.module('ReferenceApp', ['cosmicAliens', 'ngStorage']);

  //Based on settings, allow user to pick aliens randomly
  app.controller('AlienReferenceController', ["$scope", "alienData", '$localStorage', '$sessionStorage', function($scope, Aliens, $localStorage, $sessionStorage) {
    $localStorage.$default({
      complexities: [true, true, true],
      games: { E: true },
      orderPref: ['name'],
      groupPref: ['game', 'level']
    });

    //Include
    $scope.complexities = $localStorage.complexities;
    $scope.games = $localStorage.games;
    $scope.orderPref = $localStorage.orderPref;
    $scope.groupPref = $localStorage.groupPref;
    $scope.alienGroups = [];
    var namesAll = [], aliensAll = [];

    function groupAliens(list, level) {
      if($scope.groupPref.length < 1) return { value: '', items: list };

      var grouped = {};
      var field = $scope.groupPref[level];
      list.forEach(function(item) {
        var group = item[field];//var group = $parse(field)(item);
        grouped[group] = grouped[group] || [];
        grouped[group].push(angular.copy(item));
      });
      var groups = Object.keys(grouped);

      var result = groups.map(function(group) {
        return { value: group, items: grouped[group] };
      });
      if($scope.groupPref[level + 1]) result = result.map(function(group) {
        return { value: group.value, items: groupAliens(group.items, level+1) };
      });
      
      return result;
    };

    //Show filtered, grouped list of aliens
    function showAliens() {
      console.time('filter');
      //Filter
      var aliens = aliensAll.filter(function(e) {
        return $scope.complexities[e.level] && $scope.games[e.game];
      });
      console.timeEnd('filter');
      //Group
      console.time('group');
      $scope.alienGroups = groupAliens(aliens, 0);
      console.timeEnd('group');
      
    }

    $scope.onSettingChange = function(setting) {
      $localStorage[setting] = $scope[setting];
      showAliens();
    };

    //Init generator
    Aliens.onLoaded(function() {
      namesAll = Aliens.getNames();
      aliensAll = namesAll.map(Aliens.get);
      showAliens();
    });
  }]);
})();