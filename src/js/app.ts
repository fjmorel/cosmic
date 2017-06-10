///<reference path="./app.d.ts" />

import "../../node_modules/ngstorage/ngStorage.min.js";
import "../css/cosmic.less";

import * as BaseTheme from "./theme";
import * as Drawer from "./nav.drawer";
import * as Toolbar from "./nav.toolbar";
import * as Filters from "./filters";

import * as AlienService from "./aliens/service";
import * as AlienTheme from "./aliens/theme";
import * as AlienPanel from "./aliens/alien.component";
import * as Generator from "./generator/controller";
import * as Reference from "./reference/aliens.controller";
import * as OptionTemplates from "./aliens/options";

// todo: testing
// todo: use sessionstorage for current state (current, given, pool, etc)

const pageModuleDependencies = ["base", "aliens", "ngStorage"];

angular.module("base", ["ngMaterial", "ngMdIcons"])
	.config(["$compileProvider", function($compileProvider: ng.ICompileProvider) {
		$compileProvider.debugInfoEnabled(false);
		$compileProvider.commentDirectivesEnabled(false);
		$compileProvider.cssClassDirectivesEnabled(false);
	}])

	.config(["$mdThemingProvider", BaseTheme.Theme])

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
	.service("alienData", ["$http", AlienService.Service])
	.config(["$mdThemingProvider", AlienTheme.Theme])

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

function generateModuleConfig(name: string) {
	return ["$compileProvider", "$localStorageProvider", function(compiler: ng.ICompileProvider, storage: ng.storage.IStorageProvider) {
		compiler.debugInfoEnabled(false);
		storage.setKeyPrefix(name);
	}];
}