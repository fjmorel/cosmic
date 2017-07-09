///<reference path="../app.d.ts" />

import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { enableProdMode } from "@angular/core";

import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import * as Mat from "@angular/material";

import { AppComponent } from "./app.component";

@NgModule({
	imports: [
		BrowserModule, BrowserAnimationsModule,
		Mat.MdToolbarModule, Mat.MdCardModule, Mat.MdButtonModule, Mat.MdCoreModule, Mat.StyleModule
	],
	declarations: [AppComponent],
	bootstrap: [AppComponent]
})
class AppModule { }

enableProdMode();
platformBrowserDynamic().bootstrapModule(AppModule);