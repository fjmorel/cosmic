//Data backend
(function() {
  "use strict";
  angular.module('CosmicData', []).factory('alienData', ['$http', function($http) {
    var aliens = {}, alien_names = [];

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
})();