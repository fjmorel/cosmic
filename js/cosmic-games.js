//Functionality relating to games
(function() {
  "use strict";
  var mod = angular.module('cc.games', []);
  
  //Turn game initial into game name
  mod.filter('gameName', function() {
    var games = {
      E: "Encounter", A: "Alliance", C: "Conflict", D: "Dominion", I: "Incursion", S: "Storm"
    };
    return function(initial) { return 'Cosmic ' + games[initial]; };
  });


})();