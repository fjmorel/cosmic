import { Component, Output, EventEmitter, OnInit } from "@angular/core";

@Component({
	selector: "game-options",
	styles: [`
	.mat-list-item { height: 32px; }
	`],
	template: `
<md-card>
<md-card-title>Games to include</md-card-title>
<md-list>
	<md-list-item  *ngFor="let game of gameNames">
		<md-checkbox class="mat-primary" (change)="select()" [(ngModel)]="games[game]">{{game}}</md-checkbox>
	</md-list-item>
</md-list>
</md-card>
`,
})
export class GameOptionsComponent implements OnInit {
	@Output() public onSelected = new EventEmitter<string[]>();
	public readonly gameNames: Games[] = ["Encounter", "Alliance", "Conflict", "Dominion", "Eons", "Incursion", "Storm"];
	// tood: load settings from storage
	public games: Partial<Record<Games, boolean>> = { Encounter: true };
	public ngOnInit(): void {
		this.select();
	}
	private select() {
		this.onSelected.emit(this.gameNames.filter(g => this.games[g]));
	}
}