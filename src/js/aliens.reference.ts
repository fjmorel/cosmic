(function () {
  "use strict";
  //TODO: testing
  let app = angular.module('cc.aliens.reference', ['cc.base', 'cc.aliens', 'ngStorage', 'ngAria', 'ngMaterial']);
  
  //Based on settings, allow user to pick aliens randomly
  app.controller('AlienReference', ReferenceController);
  
  ReferenceController.$inject = ["alienData", '$localStorage', 'groupByFilter'];
  function ReferenceController(Aliens: AlienService, $localStorage: IStorageService, groupBy) {
    let ctrl = this;

    //Set up default settings
    $localStorage.$default({
      complexities: [true, true, true],
      games: { E: true },
      orderPref: ['name'],
      groupPref: ['game', 'level']
    });

    //Load settings
    ctrl.complexities = $localStorage.complexities;
    ctrl.games = $localStorage.games;
    ctrl.orderPref = $localStorage.orderPref;
    ctrl.groupPref = $localStorage.groupPref;
    ctrl.alienGroups = [];

    //Show filtered, grouped list of aliens
    function refresh(): void {
      //Filter
      let aliens = Aliens.getMatching(ctrl.complexities, ctrl.games);

      //Group
      ctrl.alienGroups = groupBy(aliens, ctrl.groupPref);
    }

    //Save, then show filtered, grouped list of aliens
    ctrl.change = function (setting: string): void {
      if (setting) $localStorage[setting] = ctrl[setting];
      refresh();
    };

    //Initialize reference page
    Aliens.init().then(refresh);
  }
})();