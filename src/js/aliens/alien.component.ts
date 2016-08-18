/// <reference path="../../../typings/project.d.ts" />
//Turn alien object into a panel with its information
export class Controller {
	alien: Alien;
	constructor($sce: ng.ISCEService) {
		let alien = this.alien;
		if (typeof alien.description === "string")
			alien.description = $sce.trustAsHtml(alien.description);
	}
}

//TODO: Add extra information (and update JSON file)
export let template = `
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
`;