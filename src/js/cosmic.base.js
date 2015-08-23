(function () {
  "use strict";
  var mod = angular.module('cc.base', ['ngMaterial']);

  //Cosmic Theme
  mod.config(['$mdThemingProvider', function (ThemeProvider) {
    ThemeProvider.theme('default').primaryPalette('deep-purple').accentPalette('amber');
  }]);
  
  mod.value('gameInitials', ['E', 'A', 'C', 'D', 'I', 'S']);

  //Turn game initial into game name
  mod.filter('gameName', function () {
    var games = {
      E: "Encounter",
      A: "Alliance",
      C: "Conflict",
      D: "Dominion",
      I: "Incursion",
      S: "Storm"
    };
    return function (initial) { return 'Cosmic ' + games[initial]; };
  });

})();