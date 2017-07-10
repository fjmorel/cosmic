import { Component, Output, EventEmitter, OnInit } from "@angular/core";
import { LocalStorageService } from "angular-2-local-storage";

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
	public constructor(private Storage: LocalStorageService) { }
	public ngOnInit(): void {
		const games: Games[] = this.Storage.get<Games[]>("games") || ["Encounter"];
		this.gameNames.forEach(game => { this.games[game] = false; });
		games.forEach(game => { this.games[game] = true; });
		this.select();
	}
	private select() {
		const selectedNames = this.gameNames.filter(g => this.games[g]);
		this.Storage.set("games", selectedNames);
		this.onSelected.emit(selectedNames);
	}
}