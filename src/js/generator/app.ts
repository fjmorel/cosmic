///<reference path="../app.d.ts" />

import { NgModule } from "@angular/core";

import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";

import { LocalStorageModule } from "angular-2-local-storage";

import { AlienGeneratorPage } from "./app.component";
import { AlienGeneratorService } from "./generator.service";
import * as Shared from "../shared";

@NgModule({
	imports: [
		BrowserModule, NoopAnimationsModule,
		FormsModule,
		HttpClientModule,
		LocalStorageModule.withConfig({ prefix: "alien-gen", storageType: "localStorage" }),
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

Shared.startApp(AlienGeneratorModule);
