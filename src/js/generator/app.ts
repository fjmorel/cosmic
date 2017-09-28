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

import { AlienGeneratorPage } from "./app.component";
import { AlienGeneratorService } from "./generator.service";
import { NoConflictStyleCompatibilityMode } from "@angular/material";
import * as Shared from "../shared";

@NgModule({
	imports: [
		BrowserModule, NoopAnimationsModule,
		FormsModule,
		HttpClientModule,
		LocalStorageModule.withConfig({ prefix: "alien-gen", storageType: "localStorage" }),
		NoConflictStyleCompatibilityMode,
		Shared.ThemingModule
	],
	declarations: [
		AlienGeneratorPage,
		Shared.CosmicDrawerComponent,
		Shared.GameOptionsComponent, Shared.LevelOptionsComponent,
		Shared.AlienCardComponent, Shared.AlienGridComponent,
		Shared.LevelNamePipe, Shared.LevelStarsPipe
	],
	bootstrap: [AlienGeneratorPage],
	providers: [Shared.AlienService, AlienGeneratorService]
})
class AlienGeneratorModule { }

enableProdMode();
platformBrowserDynamic().bootstrapModule(AlienGeneratorModule);