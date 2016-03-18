(function () {
  "use strict";
  //TODO: testing
  let app = angular.module('cc.aliens.reference', ['cc.base', 'cc.aliens', 'ngStorage', 'ngAria', 'ngMaterial', 'ngMdIcons']);
  
  //Based on settings, allow user to pick aliens randomly
  app.controller('AlienReferenceController', ["alienData", '$localStorage', function (Aliens, $localStorage) {
    let ctrl = this;

    $localStorage.$default({
      complexities: [true, true, true],
      games: { E: true },
      orderPref: ['name'],
      groupPref: ['game', 'level']
    });

    //Include
    ctrl.complexities = $localStorage.complexities;
    ctrl.games = $localStorage.games;
    ctrl.orderPref = $localStorage.orderPref;
    ctrl.groupPref = $localStorage.groupPref;
    ctrl.alienGroups = [];

    function groupAliens(list, level) {
      if (ctrl.groupPref.length < 1) return { value: '', items: list };

      let grouped = {};
      let field = ctrl.groupPref[level];
      list.forEach(function (item) {
        let group = item[field];//let group = $parse(field)(item);
        grouped[group] = grouped[group] || [];
        grouped[group].push(angular.copy(item));
      });
      let groups = Object.keys(grouped);

      let result = groups.map(function (group) {
        return { value: group, items: grouped[group] };
      });
      if (ctrl.groupPref[level + 1]) result = result.map(function (group) {
        return { value: group.value, items: groupAliens(group.items, level + 1) };
      });

      return result;
    }

    //Save, then show filtered, grouped list of aliens
    ctrl.change = function (setting) {
      if (setting) $localStorage[setting] = ctrl[setting];

      //Filter
      let aliens = Aliens.getMatching(ctrl.complexities, ctrl.games);

      //Group
      ctrl.alienGroups = groupAliens(aliens, 0);
    };

    //Init generator
    Aliens.init().then(function (names) {
      ctrl.change();
    }).catch(function (error) {
      //TODO: something about being unable to load aliens
    });

  }]);

  angular.bootstrap(document, ['cc.aliens.reference'], { 'strictDi': true });
})();