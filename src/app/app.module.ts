// todo: testing of components
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';

import { MatButtonModule, MatCardModule, MatCheckboxModule, MatIconModule, MatInputModule, MatListModule, MatRadioModule, MatSelectModule, MatSidenavModule, MatToolbarModule } from '@angular/material';
import { LocalStorageModule } from 'angular-2-local-storage';
import { AlienCardComponent } from './aliens/card/card.component';
import { AlienGridComponent } from './aliens/grid/grid.component';
import { DrawerComponent } from './drawer/drawer.component';
import { GameOptionsComponent } from './options/games/games.component';
import { LevelOptionsComponent } from './options/levels/levels.component';
import { LevelNamePipe } from './pipes/levelname.pipe';
import { LevelStarsPipe } from './pipes/levelstars.pipe';

import { CosmicAppComponent } from './app.component';
import { AlienGeneratorPageComponent } from './generator/page/page.component';
import { CosmicHomePageComponent } from './home/page/page.component';
import { AlienReferencePageComponent } from './reference/page/page.component';

const appRoutes: Routes = [
  { path: '', component: CosmicHomePageComponent },
  { path: 'generator', component: AlienGeneratorPageComponent },
  { path: 'reference', component: AlienReferencePageComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },
  // todo: { path: '**', component: PageNotFoundComponent },
  // todo: use real urls and add placeholder pages for Generator/Reference instead of redirecting
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

    AlienCardComponent,
    AlienGridComponent,
  ],
  imports: [
    RouterModule.forRoot(appRoutes, { useHash: true }),
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    LocalStorageModule.withConfig({ prefix: 'cosmic', storageType: 'localStorage' }),
    // Core
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    // Reference and Generator
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatRadioModule,
    MatCheckboxModule,
    // Generator
    MatInputModule,
    MatSelectModule,
  ],
  providers: [],
  bootstrap: [CosmicAppComponent],
})
export class CosmicAppModule { }
