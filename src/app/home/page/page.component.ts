import { Component } from '@angular/core';

@Component({
  selector: 'cosmic-home',
  styles: [`
		#container { display: flex; flex: auto; flex-wrap: wrap; align-content: stretch; padding:8px }
		mat-card { max-width: 300px; }
		mat-card-actions { text-align: right }
	`],
  templateUrl: './page.component.html',
})
export class CosmicHomePageComponent { }
