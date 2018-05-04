// Theme and styling
import { NgModule, enableProdMode } from "@angular/core";
import * as Material from "@angular/material";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import "../../css/cosmic.scss";

export * from "./aliens";
export { CosmicDrawerComponent } from "./drawer.component";
export { GameOptionsComponent } from "./game.options.component";

const MATERIAL_MODULES = [
	// Core
	Material.MatToolbarModule,
	Material.MatCardModule,
	Material.MatButtonModule,
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

// tslint:disable-next-line:no-any
export const startApp = (appNgModule: any) => {
	enableProdMode();
	platformBrowserDynamic().bootstrapModule(appNgModule);
};
