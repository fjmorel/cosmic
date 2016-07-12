/// <reference path="../../typings/project.d.ts" />
export class Controller {
  open: () => void;
  constructor($mdSidenav: ng.material.ISidenavService) {
    this.open = function () { $mdSidenav("left").open(); };
  }
}

export let template = `
<md-sidenav md-whiteframe="2" class ="md-sidenav-left" md-component-id="left">
	<md-toolbar class ="md-tall">
		<div class ="md-toolbar-tools">
			<h2>Cosmic Companion</h2>
		</div>
	</md-toolbar>
	<md-content>
		<md-list>
			<md-list-item><md-button href="index.html">Home</md-button></md-list-item>
			<md-subheader class ="md-no-sticky">Tools</md-subheader>
			<md-list-item><md-button href="generator.html" ng-disabled="$ctrl.page === 'generator'">Alien Generator</md-button></md-list-item>
			<md-list-item><md-button href="reference.html" ng-disabled="$ctrl.page === 'reference'">Alien Reference</md-button></md-list-item>
			<md-list-item>
				<a href="https://play.google.com/store/apps/details?id=net.fmorel.cosmicgenerator">
					<img src="icons/playstore_badge.png" />
				</a>
			</md-list-item>
		</md-list>
	</md-content>
</md-sidenav>
`;