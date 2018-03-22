///<reference path="../app.d.ts" />

import { NgModule } from "@angular/core";

import { BrowserModule } from "@angular/platform-browser";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { MatToolbarModule, MatCardModule, MatButtonModule } from "@angular/material";

import { CosmicHomePage } from "./app.component";
import { startApp } from "../shared";

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

startApp(CosmicHomeModule);
