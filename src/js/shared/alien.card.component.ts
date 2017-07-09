import { Component, Input, ViewEncapsulation } from "@angular/core";

@Component({
	selector: "alien-card",
	styles: [`
	`],
	template: `
<md-card [ngClass]="'alien-'+alien.level+'-theme'">
	<md-card-header>
		<div md-card-avatar>
			<button md-raised-button class="mat-accent" (click)="toggle()"><md-icon>{{opened ? 'remove': 'add'}}</md-icon></button>
		</div>
		<md-card-title class="alien-head alien-fg">{{alien.name}}</md-card-title>
		<md-card-subtitle>{{alien.power}}</md-card-subtitle>
	</md-card-header>
	<md-card-footer>
		<div class="alien-bar alien-bg">
			<span class="alien-panel-game">{{alien.game}}</span>
			<span *ngIf="(alien.setup || alien.restriction)"><md-icon>warning</md-icon></span>
			<span class="alien-panel-level">{{alien.level | levelStars}}</span>
		</div>
		<div *ngIf="opened" class="alien-desc" [innerHTML]="alien.description"></div>
	</md-card-footer>
</md-card>
`,
	encapsulation: ViewEncapsulation.None
})
export class AlienCardComponent {
	@Input() public alien: Alien;
	private opened = false;
	public toggle() {
		this.opened = !this.opened;
	}
}