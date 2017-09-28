///<reference path="../app.d.ts" />

import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { enableProdMode, NgModule } from "@angular/core";

import { BrowserModule } from "@angular/platform-browser";
// tslint:disable-next-line:no-submodule-imports
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { NoConflictStyleCompatibilityMode, MatToolbarModule, MatCardModule, MatButtonModule, StyleModule } from "@angular/material";

import { CosmicHomePage } from "./app.component";

@NgModule({
	imports: [
		// Core
		BrowserModule,
		NoopAnimationsModule,
		NoConflictStyleCompatibilityMode,
		// Material components
		MatToolbarModule,
		MatCardModule,
		MatButtonModule,
		StyleModule,
	],
	declarations: [CosmicHomePage],
	bootstrap: [CosmicHomePage]
})
class CosmicHomeModule { }

enableProdMode();
platformBrowserDynamic().bootstrapModule(CosmicHomeModule);