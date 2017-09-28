export * from "./aliens";
export { CosmicDrawerComponent } from "./drawer.component";
export { GameOptionsComponent } from "./game.options.component";

import { NgModule } from "@angular/core";
import * as Material from "@angular/material";

const MATERIAL_MODULES = [
	// Core
	Material.MatToolbarModule,
	Material.MatCardModule,
	Material.MatButtonModule,
	Material.StyleModule,
	// Reference and Generator
	Material.MatSidenavModule,
	Material.MatIconModule,
	Material.MatListModule,
	Material.MatRadioModule,
	Material.MatCheckboxModule,
	// Generator
	Material.MatInputModule,
	Material.MatSelectModule
];

@NgModule({
	imports: MATERIAL_MODULES,
	exports: MATERIAL_MODULES
})
export class ThemingModule { }