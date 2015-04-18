(function() {
  "use strict";
  var mod = angular.module('cc.aliens', []);

  //Fetch alien data and provide methods to retrieve names and aliens
  mod.factory('alienData', ['$http', '$filter', function($http, $filter) {
    var aliens = {}, alien_names = [];

    return {
      onLoaded: function(func) {
        $http.get("data/aliens.json").success(function(data) {
          var getClass = $filter('levelClass');
          data.forEach(function(alien) {
            alien.class = getClass(alien.level);//save class immediately
            aliens[alien.name] = alien;
            alien_names.push(alien.name);
          });
        }).success(func);
      },
      getNames: function() { return alien_names.slice(0); },
      get: function(name) { return angular.copy(aliens[name] || {}); }
    };
  }]);

  //Turn alien level into Bootstrap class name for colors
  mod.filter('levelClass', function() {
    var levelToClassMapping = ["success", "warning", "danger"];
    return function(lvl) { return levelToClassMapping[lvl]; };
  });

  //Turn game initial into game name
  mod.filter('gameName', function() {
    var games = {
      E: "Encounter", A: "Alliance", C: "Conflict", D: "Dominion", I: "Incursion", S: "Storm"
    };
    return function(initial) { return 'Cosmic ' + games[initial]; };
  });

  //Turn alien level into Bootstrap class name for colors
  mod.filter('alienFromName', ['alienData', function(alienData) {
    return function(name) { return alienData.get(name); };
  }]);

  //Turn alien level into a string of stars to show level
  mod.filter('levelStars', function() {
    //var starred = {};
    return function(lvl) {
      //if(starred[lvl]) return starred[lvl];
      var stars = '';
      for(var i = 0; i <= lvl; i++) { stars += '★'; }
      //starred[lvl] = stars;
      return stars;
    };
  });

  mod.directive('alienTitle', function() {
    return {
      scope: {
        alien: '='
      },
      restrict: "AE",
      templateUrl: 'partials/alien-title.html'
    };
  });

  //Turn alien object into a panel with its information
  mod.directive("alienPanel", ['$sce', function($sce) {
    return {
      restrict: "AE",
      templateUrl: "partials/alien-panel.html",
      link: function(scope) {
        //Mark description as safe HTML
        if(typeof scope.alien.description === 'string')
          scope.alien.description = $sce.trustAsHtml(scope.alien.description);
      }
    };
  }]);

})();