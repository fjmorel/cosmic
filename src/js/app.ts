///<reference path="./app.d.ts" />

import "../../node_modules/ngstorage/ngStorage.min.js";
import "../css/cosmic.less";

import * as BaseTheme from "./theme";
import * as Drawer from "./nav.drawer";
import * as Toolbar from "./nav.toolbar";

import * as AlienService from "./aliens/service";
import * as AlienTheme from "./aliens/theme";
import * as AlienPanel from "./aliens/alien.component";
import * as Generator from "./generator/controller";
import * as Reference from "./reference/aliens.controller";
import * as OptionTemplates from "./aliens/options";

// todo: testing
// todo: use sessionstorage for current state (current, given, pool, etc)

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

	.filter("levelStars", function(): LevelFilter {
		const stars = ["★", "★★", "★★★"];
		return lvl => stars[lvl];
	})
	.filter("levelName", function(): LevelFilter {
		const names = ["Green", "Yellow", "Red"];
		return lvl => names[lvl];
	})

	.component("alienPanel", {
		bindings: AlienPanel.Bindings,
		template: AlienPanel.template,
		controller: ["$sce", AlienPanel.Controller]
	})
	.component("alienLevelOptions", { bindings: OptionTemplates.Bindings, template: OptionTemplates.Levels })
	.component("alienGameOptions", { bindings: OptionTemplates.Bindings, template: OptionTemplates.Games });

generateModule("aliens.generator", Generator.Controller, "AlienGenerator", "alien-gen-");
generateModule("aliens.reference", Reference.Controller, "AlienReference", "alien-ref-");

function generateModule(name: string, controller: ng.IControllerConstructor, controllerAs: string, storagePrefix: string) {
	angular.module(name, ["base", "aliens", "ngStorage"])
		.config(["$localStorageProvider", function(storage: ng.storage.IStorageProvider) {
			storage.setKeyPrefix(storagePrefix);
		}])
		.controller(controllerAs, ["$localStorage", "alienData", controller]);
}