///<reference path="../app.d.ts" />

import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { enableProdMode } from "@angular/core";

import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import * as Mat from "@angular/material";

import { CosmicHomePage } from "./app.component";

@NgModule({
	imports: [
		BrowserModule, NoopAnimationsModule,
		Mat.MdToolbarModule, Mat.MdCardModule, Mat.MdButtonModule, Mat.MdCoreModule, Mat.StyleModule
	],
	declarations: [CosmicHomePage],
	bootstrap: [CosmicHomePage]
})
class CosmicHomeModule { }

enableProdMode();
platformBrowserDynamic().bootstrapModule(CosmicHomeModule);