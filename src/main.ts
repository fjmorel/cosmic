import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { CosmicAppModule } from './app/app.module';
import { environment } from './environments/environment';

if(environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(CosmicAppModule)
  .catch(err => console.log(err));
