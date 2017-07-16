///<reference path="../app.d.ts" />

import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { enableProdMode } from "@angular/core";

import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";

import { LocalStorageModule } from "angular-2-local-storage";

import { AlienReferencePage } from "./app.component";
import * as Shared from "../shared";

@NgModule({
	imports: [
		BrowserModule, NoopAnimationsModule,
		FormsModule,
		HttpClientModule,
		LocalStorageModule.withConfig({ prefix: "alien-ref", storageType: "localStorage" }),
		Shared.ThemingModule
	],
	declarations: [
		AlienReferencePage,
		Shared.CosmicDrawerComponent, Shared.GameOptionsComponent, Shared.LevelOptionsComponent, Shared.AlienCardComponent, Shared.AlienGridComponent,
		Shared.LevelNamePipe, Shared.LevelStarsPipe
	],
	bootstrap: [AlienReferencePage],
	providers: [Shared.AlienService]
})
class AlienReferenceModule { }

enableProdMode();
platformBrowserDynamic().bootstrapModule(AlienReferenceModule);