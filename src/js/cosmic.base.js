(function () {
  "use strict";
  var mod = angular.module('cc.base', ['ngMaterial']);

  //Cosmic Theme
  mod.config(['$mdThemingProvider', function ($mdThemingProvider) {
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
      .accentPalette('amber', {
        //'default': '200' // use shade 200 for default, and keep all other shades the same
      });

    $mdThemingProvider.theme('levels').primaryPalette('aliens', {
      'default': '50',
      'hue-1': '100', // use shade 100 for the <code>md-hue-1</code> class
      'hue-2': '200', // use shade 600 for the <code>md-hue-2</code> class
      'hue-3': '300' // use shade A100 for the <code>md-hue-3</code> class
    });
  }]);

  //Turn game initial into game name
  mod.filter('gameName', function () {
    var games = {
      E: "Encounter", A: "Alliance", C: "Conflict", D: "Dominion", I: "Incursion", S: "Storm"
    };
    return function (initial) { return 'Cosmic ' + games[initial]; };
  });

})();