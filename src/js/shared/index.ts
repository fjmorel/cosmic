export * from "./aliens";
export { CosmicDrawerComponent } from "./drawer.component";
export { GameOptionsComponent } from "./game.options.component";

import { NgModule } from "@angular/core";
import * as Mat from "@angular/material";

const MATERIAL_MODULES = [
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
];

@NgModule({
	imports: MATERIAL_MODULES,
	exports: MATERIAL_MODULES
})
export class ThemingModule { }