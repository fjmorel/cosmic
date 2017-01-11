///<reference path="./app.d.ts" />

import '../../node_modules/ngstorage/ngStorage.min.js';
import '../css/cosmic.less';

import BaseTheme from "./theme";
import * as Drawer from "./nav.drawer";
import * as Toolbar from "./nav.toolbar";
import * as Filters from "./filters";

import AlienService from "./aliens/service";
import AlienTheme from "./aliens/theme";
import * as AlienPanel from "./aliens/alien.component";
import * as Generator from "./generator/controller";
import * as Reference from "./reference/aliens.controller";
import * as OptionTemplates from "./aliens/options";

// todo: testing
// todo: use sessionstorage for current state (current, given, pool, etc)

const pageModuleDependencies = ["base", "aliens", "ngStorage", "ngAria", "ngMaterial", "ngMdIcons"];

angular.module("base", ["ngMaterial", "ngMdIcons"])
  .config(["$mdThemingProvider", BaseTheme])

  .component("cosmicDrawer", {
    template: Drawer.template,
    bindings: Drawer.Bindings
  })

  .component("cosmicToolbar", {
    template: Toolbar.template,
    bindings: Toolbar.Bindings
  })

  .controller("NavDrawer", ["$mdSidenav", Drawer.Controller]);

angular.module("aliens", ["ngMaterial"])
  .service("alienData", ["$http", AlienService])
  .config(["$mdThemingProvider", AlienTheme])

  .filter("levelClass", Filters.LevelToClass)
  .filter("levelStars", Filters.LevelToStars)
  .filter("levelName", Filters.LevelToName)

  .component("alienPanel", {
    bindings: AlienPanel.Bindings,
    template: AlienPanel.template,
    controller: ["$sce", AlienPanel.Controller]
  })
  .component("alienLevelOptions", { bindings: OptionTemplates.Bindings, template: OptionTemplates.Levels })
  .component("alienGameOptions", { bindings: OptionTemplates.Bindings, template: OptionTemplates.Games });

angular.module("aliens.generator", pageModuleDependencies)
  .config(generateModuleConfig("alien-gen-"))
  .controller("AlienGenerator", ["$localStorage", "alienData", Generator.Controller]);

angular.module("aliens.reference", pageModuleDependencies)
  .config(generateModuleConfig("alien-ref-"))
  .controller("AlienReference", ["$localStorage", "alienData", Reference.Controller]);

// add ?:any to all parameters to avoid TypeScript errors, and make new Date() in formula <any> as well
(function (i?: any, s?: any, o?: any, g?: any, r?: any, a?: any, m?: any) { i["GoogleAnalyticsObject"] = r; i[r] = i[r] || function () { (i[r].q = i[r].q || []).push(arguments) }, i[r].l = <any>(new Date()) * 1; a = s.createElement(o), m = s.getElementsByTagName(o)[0]; a.async = 1; a.src = g; m.parentNode.insertBefore(a, m) })(window, document, "script", "https://www.google-analytics.com/analytics.js", "ga");
ga("create", "UA-76241009-1", "auto");
ga("send", "pageview");

function generateModuleConfig(name: string){
  return ["$compileProvider", "$localStorageProvider", function (compiler: ng.ICompileProvider, storage: ng.storage.IStorageProvider) {
    compiler.debugInfoEnabled(false);
    storage.setKeyPrefix(name);
  }]
}