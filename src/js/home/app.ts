///<reference path="../app.d.ts" />

import { NgModule } from "@angular/core";
import { MatButtonModule, MatCardModule, MatToolbarModule } from "@angular/material";
import { BrowserModule } from "@angular/platform-browser";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { startApp } from "../shared";
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

startApp(CosmicHomeModule);
