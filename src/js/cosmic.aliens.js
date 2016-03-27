(function () {
  "use strict";
  let mod = angular.module('cc.aliens', ['ngMaterial']);

  //Themes for alien-related items
  mod.config(['$mdThemingProvider', function (ThemeProvider) {
    ThemeProvider.definePalette('alien-green', ThemeProvider.extendPalette('green', {
      '500': '189247',
      'contrastDefaultColor': 'light'
    }));
    ThemeProvider.definePalette('alien-yellow', ThemeProvider.extendPalette('deep-orange', {
      '500': 'c39c07'
    }));
    ThemeProvider.definePalette('alien-red', ThemeProvider.extendPalette('red', {
      '500': 'c31b09',
      'contrastDefaultColor': 'light'
    }));

    ThemeProvider.theme('alien0').primaryPalette('alien-green').accentPalette('deep-purple');
    ThemeProvider.theme('alien1').primaryPalette('alien-yellow').accentPalette('deep-purple');
    ThemeProvider.theme('alien2').primaryPalette('alien-red').accentPalette('deep-purple');
  }]);

  //Fetch alien data and provide methods to retrieve names and aliens
  mod.factory('alienData', ['$http', function ($http) {
    let aliens = {}, alien_names = [];

    return {
      init: function () {
        return $http.get("data/aliens.json").then(function (result) {
          result.data.list.forEach(function (alien) {
            aliens[alien.name] = alien;
            alien_names.push(alien.name);
          });
          alien_names.sort();
          return alien_names.slice(0);
        });
      },

      get: name => aliens[name] || {},
      getMatching: function (levels, games, exclude, setup) {
        return this.getMatchingNames(levels, games, exclude, setup).map(name => aliens[name]);
      },
      getMatchingNames: function (levels, games, exclude, setup) {
        //Remove wrong game/level
        let names = alien_names.filter(name => levels[aliens[name].level] && games[aliens[name].game]);
        //Remove specific names
        if (exclude && exclude.length) names = names.filter(name => exclude.indexOf(name) < 0);
        //Remove if removing game setup (unless only removing extra color)
        if (setup && setup !== "none") names = names.filter(name => (!aliens[name].setup || (setup === 'color' && aliens[name].setup !== "color")));

        return names;
      }
    };
  }]);

  //Turn alien level into Bootstrap class name for colors
  mod.filter('levelClass', function () {
    let classes = ["success", "warning", "danger"];
    return lvl => classes[lvl];
  });

  //Turn alien level into a string of stars to show level
  mod.filter('levelStars', function () {
    let stars = ['★', '★★', '★★★'];
    return lvl => stars[lvl];
  });

  //Turn alien level into a string of stars to show level
  mod.filter('levelName', function () {
    let names = ['Green', 'Yellow', 'Red'];
    return lvl => names[lvl];
  });

  //TODO: Add extra information (and update JSON file)
  //Turn alien object into a panel with its information
  mod.component("alienPanel", {
    bindings: { alien: '<item' },
    template: `
<md-card>
	<md-card-content class ="alien-head">
		<md-button class ="md-alien{{::$ctrl.alien.level}}-theme md-raised md-primary" ng-click="$ctrl.opened = !$ctrl.opened">{{$ctrl.opened ? '-': '+'}}</md-button>
		<h2 class ="md-alien{{::$ctrl.alien.level}}-theme md-title alien-fg-{{::$ctrl.alien.level}}">{{::$ctrl.alien.name}}</h2>
		<p class ="md-subhead clear">{{::$ctrl.alien.power}}</p>
	</md-card-content>
	<md-card-footer class ="alien-bar alien-bg-{{::$ctrl.alien.level}}">
		<span class ="alien-panel-game">C{{::$ctrl.alien.game}}</span>
		<span class ="alien-panel-level">{{::$ctrl.alien.level | levelStars}}</span>
		<span ng-if="::($ctrl.alien.setup || $ctrl.alien.restriction)">⚠</span>
		<span class ="clear"></span>
	</md-card-footer>
	<md-card-footer ng-if="$ctrl.opened" class ="alien-desc md-body-1" ng-bind-html="::$ctrl.alien.description">
	</md-card-footer>
</md-card>
      `,
    controller: ['$sce', function ($sce) {
      if (typeof this.alien.description === 'string')
        this.alien.description = $sce.trustAsHtml(this.alien.description);
    }]
  });

  mod.component('alienLevelOptions', {
    bindings: { options: '=', save: '=' },
    template: `
<md-card-content>
  <h4 class ="md-title">Levels to include</h4>
  <md-checkbox ng-change="$ctrl.save('complexities')" ng-model="$ctrl.options[level]" ng-repeat="(level, name) in ::['Green','Yellow','Red']"
  ng-class ="::'md-primary md-alien'+level+'-theme'">{{::name}}</md-checkbox>
</md-card-content>
      `
  });

  mod.component('alienGameOptions', {
    bindings: { options: '=', save: '=' },
    template: `
<md-card-content>
  <h4 class ="md-title">Games to include</h4>
  <md-checkbox ng-change="$ctrl.save('game')" ng-model="$ctrl.options[game]" ng-repeat="game in ::['E', 'A', 'C', 'D', 'I', 'S']"
  class ="md-primary">{{::game | gameName}}</md-checkbox>
</md-card-content>
      `
  })
})();