/// <reference path="../../typings/project.d.ts" />
//import '../../node_modules/ngstorage/ngStorage.min';

import BaseTheme from './theme';
import * as Drawer from './nav.drawer';
import * as Toolbar from './nav.toolbar';
import * as Filters from './filters';

import AlienService from './aliens/service';
import AlienTheme from './aliens/theme';
import * as AlienPanel from './aliens/alien.component';
import * as Generator from './aliens/generator.controller';
import * as Reference from './aliens/reference.controller';
import * as OptionTemplates from './aliens/options';

//TODO: testing
//TODO: use sessionstorage for current state (current, given, pool, etc)

angular.module('base', ['ngMaterial', 'ngMdIcons'])
  .config(['$mdThemingProvider', BaseTheme])

  .value('gameInitials', ['E', 'A', 'C', 'D', 'I', 'S'])
  .filter('gameName', Filters.InitialToGameName)
  .filter('groupBy', Filters.GroupBy)

  .component("cosmicDrawer", {
    template: Drawer.template,
    bindings: { page: '<' }
  })

  .component('cosmicToolbar', {
    template: Toolbar.template,
    bindings: { title: '<', drawer: '<' }
  })

  .controller('NavDrawer', ['$mdSidenav', Drawer.Controller]);

angular.module('aliens', ['ngMaterial'])
  .service('alienData', ['$http', AlienService])
  .config(['$mdThemingProvider', AlienTheme])

  .filter('levelClass', Filters.LevelToClass)
  .filter('levelStars', Filters.LevelToStars)
  .filter('levelName', Filters.LevelToName)

  .component("alienPanel", {
    bindings: { alien: '<item' },
    template: AlienPanel.template,
    controller: ['$sce', AlienPanel.Controller]
  })
  .component('alienLevelOptions', { bindings: { options: '=', save: '=' }, template: OptionTemplates.Levels })
  .component('alienGameOptions', { bindings: { options: '=', save: '=' }, template: OptionTemplates.Games });

angular.module('aliens.generator', ['base', 'aliens', 'ngStorage', 'ngAria', 'ngMaterial', 'ngMdIcons'])
  .config(['$compileProvider', '$localStorageProvider', function (compiler: ng.ICompileProvider, storage: ng.storage.IStorageProvider) {
    compiler.debugInfoEnabled(false);
    storage.setKeyPrefix("alien-gen-");
  }])
  .service('AlienGeneratorService', ['alienData', Generator.Service])
  .controller('AlienGenerator', ['$localStorage', 'AlienGeneratorService', Generator.Controller]);

angular.module('aliens.reference', ['base', 'aliens', 'ngStorage', 'ngAria', 'ngMaterial', 'ngMdIcons'])
  .config(['$compileProvider', '$localStorageProvider', function (compiler: ng.ICompileProvider, storage: ng.storage.IStorageProvider) {
    compiler.debugInfoEnabled(false);
    storage.setKeyPrefix("alien-ref-");
  }])
  .controller('AlienReference', ["alienData", '$localStorage', 'groupByFilter', Reference.Controller]);

/**
 * Google Analytics
 */
//Add ?:any to all parameters to avoid TypeScript errors, and make new Date() in formula <any> as well
(function (i?: any, s?: any, o?: any, g?: any, r?: any, a?: any, m?: any) { i['GoogleAnalyticsObject'] = r; i[r] = i[r] || function () { (i[r].q = i[r].q || []).push(arguments) }, i[r].l = <any>(new Date()) * 1; a = s.createElement(o), m = s.getElementsByTagName(o)[0]; a.async = 1; a.src = g; m.parentNode.insertBefore(a, m) })(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');
ga('create', 'UA-76241009-1', 'auto');
ga('send', 'pageview');