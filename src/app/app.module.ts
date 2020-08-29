// todo: testing of components
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';

import { StorageServiceModule } from 'ngx-webstorage-service';
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

    StorageServiceModule,
    AppRoutingModule,

    // Angular Material modules
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
