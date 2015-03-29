//Functionality relating to aliens
(function() {
  "use strict";
  var mod = angular.module('cosmicAliens', []);

  //Fetch alien data and provide methods to retrieve names and aliens
  mod.factory('alienData', ['$http', function($http) {
    var aliens = {}, alien_names = [];
    console.log("data service");
    return {
      onLoaded: function(func) {
        $http.get("data/aliens.json").success(function(data) {
          data.forEach(function(alien) {
            aliens[alien.name] = alien;
            alien_names.push(alien.name);
          });
        }).success(func);
      },
      getNames: function() { return alien_names.slice(0); },
      get: function(name) { return aliens[name] || {} }
    };
  }]);

  //Turn alien level into Bootstrap class name for colors
  mod.filter('levelClass', function() {
    var levelToClassMapping = ["success", "warning", "danger"];
    return function(lvl) { return levelToClassMapping[lvl]; };
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

  mod.directive('alienTitle', function(alienData) {
    return {
      scope : {
        alien : '='
      },
      restrict: "E",
      template: '<div><span class="pull-right label label-{{alien.level | levelClass}}">C{{alien.game}}</span><span class="pull-right label label-{{alien.level | levelClass}}">{{alien.level | levelStars}}</span><span ng-show="alien.setup || alien.restriction" class="pull-right label label-{{alien.level | levelClass}}">!</span><span>{{alien.name}}</span></div>'
    }
  });

  //Turn alien object into a panel with its information
  mod.directive("alienPanel", ['$sce', function($sce) {
    return {
      restrict: "E",
      templateUrl: "partials/alien-panel.html",
      link: function($scope, element, attrs, controllers) {
        //Mark description as safe HTML
        $scope.alien.description = $sce.trustAsHtml($scope.alien.description);
      }
    };
  }]);

})();