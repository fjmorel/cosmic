(function() {
  "use strict";
  let mod = angular.module('cc.aliens', ['ngMaterial']);

  //Themes for alien-related items
  mod.config(['$mdThemingProvider', function(ThemeProvider) {
		//TODO: Override more colors, especially active color on btns
    ThemeProvider.definePalette('alien-green', ThemeProvider.extendPalette('green', {
      '500': '189247'
    }));
    ThemeProvider.definePalette('alien-yellow', ThemeProvider.extendPalette('deep-orange', {
      '500': 'c39c07'
    }));
    ThemeProvider.definePalette('alien-red', ThemeProvider.extendPalette('red', {
      '500': 'c31b09',
      'contrastDefaultColor': 'light',
      'contrastDarkColors': ['600', '700', '800', '900', 'A700'],
      'contrastLightColors': ['50', '100', '200', '300', '400', '500', 'A100', 'A200', 'A400']
    }));

    ThemeProvider.theme('alien1').primaryPalette('alien-green').accentPalette('deep-purple');
    ThemeProvider.theme('alien2').primaryPalette('alien-yellow').accentPalette('deep-purple');
    ThemeProvider.theme('alien3').primaryPalette('alien-red').accentPalette('deep-purple');

  }]);

  //Fetch alien data and provide methods to retrieve names and aliens
  mod.factory('alienData', ['$q', '$http', '$filter', function($q, $http, $filter) {
    let aliens = {}, alien_names = [];
    let loaded = false;
    let getNames = () => alien_names.slice(0);

    return {
      init: function() {
        if (loaded) return $q.when(getNames());
        return $http.get("data/aliens.json").then(function(result) {
          let getClass = $filter('levelClass');
          result.data.list.forEach(function(alien) {
            alien.class = getClass(alien.level);//save class immediately
            aliens[alien.name] = alien;
            alien_names.push(alien.name);
          });
          alien_names.sort();
          loaded = true;
          return getNames();
        });
      },

      "get": name => angular.copy(aliens[name] || {})
    };
  }]);

  //Turn alien level into Bootstrap class name for colors
  mod.filter('levelClass', function() {
    let classes = ["success", "warning", "danger"];
		return lvl => classes[lvl];
  });

  //Turn alien level into a string of stars to show level
  mod.filter('levelStars', function() {
		let stars = ['★', '★★', '★★★'];
    return lvl => stars[lvl];
  });

  //Turn alien level into a string of stars to show level
  mod.filter('levelName', function() {
		let names = ["Green", "Yellow", "Red"];
		return lvl => names[lvl];
	});

  //Turn alien object into a panel with its information
  mod.component("alienPanel", {
    bindings: { alien: '<item' },
    templateUrl: "partials/alien.html",
    controller: ['$sce', function($sce) {
      if (typeof this.alien.description === 'string')
        this.alien.description = $sce.trustAsHtml(this.alien.description);
    }]
  });

})();