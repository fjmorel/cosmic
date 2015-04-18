(function() {
  "use strict";
  //TODO: testing
  var app = angular.module('cc.reference', ['cc.aliens', 'ngStorage', 'ngAria', 'ngMaterial']);

  app.config(['$mdThemingProvider', function($mdThemingProvider) {
    $mdThemingProvider.definePalette('aliens', {
      '50': '491ebd',//purple
      '100': '189247',//green
      '200': 'c39c07',//yellow
      '300': 'c31b09',//red
      '400': 'ef5350',
      '500': 'f44336',
      '600': 'e53935',
      '700': 'd32f2f',
      '800': 'c62828',
      '900': 'b71c1c',
      'A100': 'ff8a80',
      'A200': 'ff5252',
      'A400': 'ff1744',
      'A700': 'd50000',
      'contrastDefaultColor': 'light',    // whether, by default, text (contrast)
      // on this palette should be dark or light
      'contrastDarkColors': undefined,
      'contrastLightColors': undefined    // could
    });

    $mdThemingProvider.theme('default')
      .primaryPalette('deep-purple', {
        //Default: 500, 300 800 and A100
        'default': '700', 'hue-1': '200', 'hue-2': '900', 'hue-3': 'A100'
      })
      // If you specify less than all of the keys, it will inherit from the
      // default shades
      .accentPalette('yellow', {
        'default': '200' // use shade 200 for default, and keep all other shades the same
      });

    $mdThemingProvider.theme('levels').primaryPalette('aliens', {
      'default': '50',
      'hue-1': '100', // use shade 100 for the <code>md-hue-1</code> class
      'hue-2': '200', // use shade 600 for the <code>md-hue-2</code> class
      'hue-3': '300' // use shade A100 for the <code>md-hue-3</code> class
    });
  }]);

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
        return { value: group.value, items: groupAliens(group.items, level + 1) };
      });

      return result;
    }

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