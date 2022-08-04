import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AlienGeneratorPageComponent } from './generator/page/page.component';
import { CosmicHomePageComponent } from './home/page/page.component';
import { AlienReferencePageComponent } from './reference/page/page.component';
import { AndroidPrivacyPolicyPage } from './privacyPolicyPage/page.component';

const appRoutes: Routes = [
  { path: '', component: CosmicHomePageComponent },
  { path: 'generator', component: AlienGeneratorPageComponent },
  { path: 'reference', component: AlienReferencePageComponent },
  { path: 'privacy', component: AndroidPrivacyPolicyPage },
  { path: '**', redirectTo: '', pathMatch: 'full' },
  // todo: { path: '**', component: PageNotFoundComponent },
  // todo: use real urls and add placeholder pages for Generator/Reference instead of redirecting
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
