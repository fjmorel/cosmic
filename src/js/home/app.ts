///<reference path="../app.d.ts" />

import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { enableProdMode, NgModule } from "@angular/core";

import { BrowserModule } from "@angular/platform-browser";
// tslint:disable-next-line:no-submodule-imports
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { MatToolbarModule, MatCardModule, MatButtonModule } from "@angular/material";

import { CosmicHomePage } from "./app.component";

@NgModule({
	imports: [
		// Core
		BrowserModule,
		NoopAnimationsModule,
		// Material components
		MatToolbarModule,
		MatCardModule,
		MatButtonModule,
	],
	declarations: [CosmicHomePage],
	bootstrap: [CosmicHomePage]
})
class CosmicHomeModule { }

enableProdMode();
platformBrowserDynamic().bootstrapModule(CosmicHomeModule);