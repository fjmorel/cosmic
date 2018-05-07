// tslint:disable-next-line:no-reference
/// <reference path="./index.d.ts" />

// todo: testing of components
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import * as Material from '@angular/material';
import { LocalStorageModule } from 'angular-2-local-storage';
import { AlienGridComponent } from './aliens/grid/grid.component';
import { DrawerComponent } from './drawer/drawer.component';
import { GameOptionsComponent } from './options/games/games.component';
import { LevelOptionsComponent } from './options/levels/levels.component';
import { LevelNamePipe } from './pipes/levelname.pipe';
import { LevelStarsPipe } from './pipes/levelstars.pipe';

import { CosmicAppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';
import { AlienGeneratorPageComponent } from './generator/page/page.component';
import { CosmicHomePageComponent } from './home/page/page.component';
import { AlienReferencePageComponent } from './reference/page/page.component';

/** Angular Material modules needed */
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
  Material.MatSelectModule,
];

@NgModule({
  declarations: [
    CosmicAppComponent,
    CosmicHomePageComponent,
    AlienGeneratorPageComponent,
    AlienReferencePageComponent,

    DrawerComponent,

    LevelNamePipe,
    LevelStarsPipe,

    LevelOptionsComponent,
    GameOptionsComponent,

    AlienGridComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,

    LocalStorageModule.withConfig({ prefix: 'cosmic', storageType: 'localStorage' }),
    AppRoutingModule,
    ...MATERIAL_MODULES,
  ],
  providers: [],
  bootstrap: [CosmicAppComponent],
})
export class CosmicAppModule { }
