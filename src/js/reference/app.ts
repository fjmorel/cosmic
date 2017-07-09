///<reference path="../app.d.ts" />

import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { enableProdMode } from "@angular/core";

import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import * as Mat from "@angular/material";

import { AppComponent } from "./app.component";
import * as Shared from "../shared";


@NgModule({
	imports: [
		BrowserModule, BrowserAnimationsModule,
		FormsModule,
		HttpModule,
		Mat.MdToolbarModule, Mat.MdCardModule, Mat.MdCheckboxModule, Mat.MdListModule, Mat.MdButtonModule, Mat.MdCoreModule, Mat.StyleModule, Mat.MdSidenavModule, Mat.MdIconModule
	],
	declarations: [
		AppComponent,
		Shared.CosmicDrawerComponent, Shared.GameOptionsComponent, Shared.LevelOptionsComponent, Shared.AlienCardComponent,
		Shared.LevelNamePipe, Shared.LevelStarsPipe
	],
	bootstrap: [AppComponent],
	providers: [Shared.AlienService]
})
class AppModule { }

enableProdMode();
platformBrowserDynamic().bootstrapModule(AppModule);