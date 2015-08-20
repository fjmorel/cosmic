(function () {
  "use strict";
  var mod = angular.module('cc.aliens', ['ngMaterial']);

  //Fetch alien data and provide methods to retrieve names and aliens
  mod.factory('alienData', ['$q', '$http', '$filter', function ($q, $http, $filter) {
    var aliens = {}, alien_names = [];
    var loaded = false;
    var getNames = function () { return alien_names.slice(0); };
    
    return {
      init: function () {
        if (loaded) return $q.when(getNames());
        return $http.get("data/aliens.json").then(function (result) {
          var getClass = $filter('levelClass');
          result.data.list.forEach(function (alien) {
            alien.class = getClass(alien.level);//save class immediately
            aliens[alien.name] = alien;
            alien_names.push(alien.name);
          });
          alien_names.sort();
          loaded = true;
          return getNames();
        });
      },
      
      "get": function (name) { return angular.copy(aliens[name] || {}); }
    };
  }]);

  //Turn alien level into Bootstrap class name for colors
  mod.filter('levelClass', function () {
    var levelToClassMapping = ["success", "warning", "danger"];
    return function (lvl) { return levelToClassMapping[lvl]; };
  });

  //Turn alien level into a string of stars to show level
  mod.filter('levelStars', function () {
    //var starred = {};
    return function (lvl) {
      //if(starred[lvl]) return starred[lvl];
      var stars = '';
      for (var i = 0; i <= lvl; i++) { stars += '★'; }
      //starred[lvl] = stars;
      return stars;
    };
  });

  mod.directive('alienTitle', function () {
    return {
      scope: {
        alien: '='
      },
      restrict: "AE",
      templateUrl: 'partials/alien-title.html'
    };
  });

  //Turn alien object into a panel with its information
  mod.directive("alienPanel", ['$sce', function ($sce) {
    return {
      restrict: "AE",
      templateUrl: "partials/alien-panel.html",
      link: function (scope) {
        //Mark description as safe HTML
        if (typeof scope.alien.description === 'string')
          scope.alien.description = $sce.trustAsHtml(scope.alien.description);
      }
    };
  }]);

})();