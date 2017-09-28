///<reference path="../app.d.ts" />

import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { enableProdMode, NgModule } from "@angular/core";

import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
// tslint:disable-next-line:no-submodule-imports
import { HttpClientModule } from "@angular/common/http";
// tslint:disable-next-line:no-submodule-imports
import { NoopAnimationsModule } from "@angular/platform-browser/animations";

import { LocalStorageModule } from "angular-2-local-storage";

import { AlienReferencePage } from "./app.component";
import { NoConflictStyleCompatibilityMode } from "@angular/material";
import * as Shared from "../shared";

@NgModule({
	imports: [
		BrowserModule, NoopAnimationsModule,
		FormsModule,
		HttpClientModule,
		LocalStorageModule.withConfig({ prefix: "alien-ref", storageType: "localStorage" }),
		NoConflictStyleCompatibilityMode,
		Shared.ThemingModule
	],
	declarations: [
		AlienReferencePage,
		Shared.CosmicDrawerComponent,
		Shared.GameOptionsComponent, Shared.LevelOptionsComponent,
		Shared.AlienCardComponent, Shared.AlienGridComponent,
		Shared.LevelNamePipe, Shared.LevelStarsPipe
	],
	bootstrap: [AlienReferencePage],
	providers: [Shared.AlienService]
})
class AlienReferenceModule { }

enableProdMode();
platformBrowserDynamic().bootstrapModule(AlienReferenceModule);