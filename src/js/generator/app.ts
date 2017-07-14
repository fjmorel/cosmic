///<reference path="../app.d.ts" />

import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { enableProdMode } from "@angular/core";

import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import * as Mat from "@angular/material";

import { LocalStorageModule } from "angular-2-local-storage";

import { AlienGeneratorPage } from "./app.component";
import { AlienGeneratorService } from "./generator.service";
import * as Shared from "../shared";

@NgModule({
	imports: [
		BrowserModule, NoopAnimationsModule,
		FormsModule,
		HttpModule,
		LocalStorageModule.withConfig({ prefix: "alien-gen", storageType: "localStorage" }),
		// Core
		Mat.MdCoreModule,
		Mat.MdToolbarModule,
		Mat.MdCardModule,
		Mat.MdButtonModule,
		Mat.StyleModule,
		// Reference and Generator
		Mat.MdSidenavModule,
		Mat.MdIconModule,
		Mat.MdListModule,
		Mat.MdRadioModule, Mat.MdCheckboxModule,
		// Generator
		Mat.MdInputModule, Mat.MdSelectModule
	],
	declarations: [
		AlienGeneratorPage,
		Shared.CosmicDrawerComponent, Shared.GameOptionsComponent, Shared.LevelOptionsComponent, Shared.AlienCardComponent, Shared.AlienGridComponent,
		Shared.LevelNamePipe, Shared.LevelStarsPipe
	],
	bootstrap: [AlienGeneratorPage],
	providers: [Shared.AlienService, AlienGeneratorService]
})
class AlienGeneratorModule { }

enableProdMode();
platformBrowserDynamic().bootstrapModule(AlienGeneratorModule);