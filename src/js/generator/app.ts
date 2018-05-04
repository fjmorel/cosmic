///<reference path="../app.d.ts" />

import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { LocalStorageModule } from "angular-2-local-storage";
import * as Shared from "../shared";
import { AlienGeneratorPage } from "./app.component";

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
	bootstrap: [AlienGeneratorPage]
})
class AlienGeneratorModule { }

Shared.startApp(AlienGeneratorModule);
