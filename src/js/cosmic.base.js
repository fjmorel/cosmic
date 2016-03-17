(function() {
  "use strict";
  let mod = angular.module('cc.base', ['ngMaterial']);

  //Cosmic Theme
  mod.config(['$mdThemingProvider', function(ThemeProvider) {
    ThemeProvider.theme('default').primaryPalette('deep-purple').accentPalette('amber');
  }]);

  mod.value('gameInitials', ['E', 'A', 'C', 'D', 'I', 'S']);

  //Turn game initial into game name
  mod.filter('gameName', function() {
    let games = {
      E: "Encounter",
      A: "Alliance",
      C: "Conflict",
      D: "Dominion",
      I: "Incursion",
      S: "Storm"
    };
    return initial => 'Cosmic ' + games[initial];
  });
	
	mod.component("cosmicDrawer", {
		templateUrl:"partials/drawer.html",
		bindings: { page : '<' },
		controller:['$scope', function($scope){
		  console.log(this);
		  $scope.$watch('DrawerConfig', function (newVal) {
		    console.log(newVal);
		  });
		}],
		controllerAs:'DrawerConfig'
	});

})();